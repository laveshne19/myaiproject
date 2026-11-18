import { getStore } from '@netlify/blobs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shiv-ai-jwt-2024-mahadev';
const TOKEN_EXPIRY = '30d';

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const ok = (body) => new Response(JSON.stringify(body), { status: 200, headers: CORS });
const fail = (code, msg) => new Response(JSON.stringify({ error: msg }), { status: code, headers: CORS });

function getToken(req) {
  const auth = req.headers.get('authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response('', { status: 200, headers: CORS });

  const users = getStore('shivai-users');
  const emails = getStore('shivai-emails');

  if (req.method === 'GET') {
    const token = getToken(req);
    if (!token) return fail(401, 'No token');
    const payload = verifyJwt(token);
    if (!payload) return fail(401, 'Invalid token');
    const raw = await users.get(payload.uid);
    if (!raw) return fail(401, 'User not found');
    const u = JSON.parse(raw);
    return ok({ user: { id: u.id, email: u.email, name: u.name, avatar: u.avatar, joinDate: u.joinDate } });
  }

  if (req.method !== 'POST') return fail(405, 'Method not allowed');

  let body;
  try { body = await req.json(); } catch { return fail(400, 'Invalid JSON'); }
  const { action, email, password, name, avatar } = body;

  if (action === 'signup') {
    if (!email || !password) return fail(400, 'Email and password required');
    if (password.length < 6) return fail(400, 'Password must be at least 6 characters');
    const cleanEmail = email.toLowerCase().trim();
    const existing = await emails.get(cleanEmail);
    if (existing) return fail(409, 'Email already in use');
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
    if (!email || !password) return fail(400, 'Email and password required');
    const cleanEmail = email.toLowerCase().trim();
    const uid = await emails.get(cleanEmail);
    if (!uid) return fail(401, 'Invalid email or password');
    const raw = await users.get(uid);
    if (!raw) return fail(401, 'Invalid email or password');
    const userData = JSON.parse(raw);
    const valid = await bcrypt.compare(password, userData.password);
    if (!valid) return fail(401, 'Invalid email or password');
    const token = jwt.sign({ uid, email: cleanEmail }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return ok({ token, user: { id: uid, email: cleanEmail, name: userData.name, avatar: userData.avatar, joinDate: userData.joinDate } });
  }

  if (action === 'profile_set') {
    const token = getToken(req);
    if (!token) return fail(401, 'No token');
    const payload = verifyJwt(token);
    if (!payload) return fail(401, 'Invalid token');
    const raw = await users.get(payload.uid);
    if (!raw) return fail(404, 'User not found');
    const userData = JSON.parse(raw);
    if (name !== undefined) userData.name = name;
    if (avatar !== undefined) userData.avatar = avatar;
    await users.set(payload.uid, JSON.stringify(userData));
    return ok({ success: true });
  }

  return fail(400, 'Unknown action');
};
