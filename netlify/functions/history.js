import { getStore } from '@netlify/blobs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shiv-ai-jwt-2024-mahadev';
const MAX_MESSAGES = 100;

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

function getToken(req) {
  const auth = req.headers.get('authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response('', { status: 200, headers: CORS });

  const token = getToken(req);
  if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS });
  const payload = verifyJwt(token);
  if (!payload) return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: CORS });

  const store = getStore('shivai-chats');

  if (req.method === 'GET') {
    const raw = await store.get(payload.uid);
    const msgs = raw ? JSON.parse(raw) : [];
    return new Response(JSON.stringify({ messages: msgs.slice(-30) }), { status: 200, headers: CORS });
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS });
    }
    const { role, content } = body;
    if (!role || !content) return new Response(JSON.stringify({ error: 'role and content required' }), { status: 400, headers: CORS });
    const raw = await store.get(payload.uid);
    const msgs = raw ? JSON.parse(raw) : [];
    msgs.push({ role, content, ts: Date.now() });
    await store.set(payload.uid, JSON.stringify(msgs.slice(-MAX_MESSAGES)));
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS });
};
