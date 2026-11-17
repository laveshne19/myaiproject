const { getStore } = require('@netlify/blobs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'shiv-ai-jwt-2024-mahadev';
const TOKEN_EXPIRY = '30d';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function ok(body) { return { statusCode: 200, headers: HEADERS, body: JSON.stringify(body) }; }
function err(code, msg) { return { statusCode: code, headers: HEADERS, body: JSON.stringify({ error: msg }) }; }

function tokenFrom(event) {
  const h = (event.headers || {});
  const auth = h.authorization || h.Authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: HEADERS, body: '' };

  let users, emails;
  try {
    users = getStore({ name: 'shivai-users', consistency: 'strong' });
    emails = getStore({ name: 'shivai-emails', consistency: 'strong' });
  } catch (e) {
    return err(503, 'Storage unavailable');
  }

  // GET /auth — verify token, return current user
  if (event.httpMethod === 'GET') {
    const token = tokenFrom(event);
    if (!token) return err(401, 'No token');
    const payload = verifyJwt(token);
    if (!payload) return err(401, 'Invalid token');
    const raw = await users.get(payload.uid);
    if (!raw) return err(401, 'User not found');
    const u = JSON.parse(raw);
    return ok({ user: { id: u.id, email: u.email, name: u.name, avatar: u.avatar, joinDate: u.joinDate } });
  }

  if (event.httpMethod !== 'POST') return err(405, 'Method not allowed');

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return err(400, 'Invalid JSON'); }

  const { action, email, password, name, avatar } = body;

  if (action === 'signup') {
    if (!email || !password) return err(400, 'Email and password required');
    if (password.length < 6) return err(400, 'Password must be at least 6 characters');
    const cleanEmail = email.toLowerCase().trim();
    const existing = await emails.get(cleanEmail);
    if (existing) return err(409, 'Email already in use');
    const uid = crypto.randomUUID();
    const hash = await bcrypt.hash(password, 10);
    const joinDate = new Date().toISOString().slice(0, 10);
    const userData = { id: uid, email: cleanEmail, password: hash, name: name || 'Devotee', avatar: '🙏', joinDate };
    await users.set(uid, JSON.stringify(userData));
    await emails.set(cleanEmail, uid);
    const token = jwt.sign({ uid, email: cleanEmail }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return ok({ token, user: { id: uid, email: cleanEmail, name: userData.name, avatar: userData.avatar, joinDate } });
  }

  if (action === 'signin') {
    if (!email || !password) return err(400, 'Email and password required');
    const cleanEmail = email.toLowerCase().trim();
    const uid = await emails.get(cleanEmail);
    if (!uid) return err(401, 'Invalid email or password');
    const raw = await users.get(uid);
    if (!raw) return err(401, 'Invalid email or password');
    const userData = JSON.parse(raw);
    const valid = await bcrypt.compare(password, userData.password);
    if (!valid) return err(401, 'Invalid email or password');
    const token = jwt.sign({ uid, email: cleanEmail }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return ok({ token, user: { id: uid, email: cleanEmail, name: userData.name, avatar: userData.avatar, joinDate: userData.joinDate } });
  }

  if (action === 'profile_set') {
    const token = tokenFrom(event);
    if (!token) return err(401, 'No token');
    const payload = verifyJwt(token);
    if (!payload) return err(401, 'Invalid token');
    const raw = await users.get(payload.uid);
    if (!raw) return err(404, 'User not found');
    const userData = JSON.parse(raw);
    if (name !== undefined) userData.name = name;
    if (avatar !== undefined) userData.avatar = avatar;
    await users.set(payload.uid, JSON.stringify(userData));
    return ok({ success: true });
  }

  return err(400, 'Unknown action');
};
