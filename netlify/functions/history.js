const { getStore } = require('@netlify/blobs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'shiv-ai-jwt-2024-mahadev';
const MAX_MESSAGES = 100;

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function tokenFrom(event) {
  const h = event.headers || {};
  const auth = h.authorization || h.Authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: HEADERS, body: '' };

  const token = tokenFrom(event);
  if (!token) return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ error: 'Unauthorized' }) };
  const payload = verifyJwt(token);
  if (!payload) return { statusCode: 401, headers: HEADERS, body: JSON.stringify({ error: 'Invalid token' }) };

  let store;
  try {
    store = getStore({ name: 'shivai-chats', consistency: 'strong' });
  } catch {
    return { statusCode: 503, headers: HEADERS, body: JSON.stringify({ error: 'Storage unavailable' }) };
  }

  if (event.httpMethod === 'GET') {
    const raw = await store.get(payload.uid);
    const msgs = raw ? JSON.parse(raw) : [];
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ messages: msgs.slice(-30) }) };
  }

  if (event.httpMethod === 'POST') {
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }
    const { role, content } = body;
    if (!role || !content) return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'role and content required' }) };
    const raw = await store.get(payload.uid);
    const msgs = raw ? JSON.parse(raw) : [];
    msgs.push({ role, content, ts: Date.now() });
    await store.set(payload.uid, JSON.stringify(msgs.slice(-MAX_MESSAGES)));
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
};
