import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Initialize DB (runs migrations on import)
import './db/schema';

import chatRouter from './routes/chat';
import leadsRouter from './routes/leads';

const app = express();
const PORT = parseInt(process.env.PORT || '3000');

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:4280').split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser clients (no origin) and allow-listed origins.
    // For any other origin, deny CORS headers without throwing (no 500).
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'X-Admin-Token']
}));

app.use(express.json({ limit: '16kb' }));

// Rate limiting on chat endpoint
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages, please slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});

// General limiter for all routes
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(generalLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// Temporary: test SMTP config — remove after confirming email works
app.get('/api/test-email', async (_req, res) => {
  const { sendLeadNotification } = await import('./services/email');
  try {
    const ok = await sendLeadNotification({
      name: 'SMTP Test', email: 'facebook.asim159@gmail.com',
      airline: 'AeroZag Internal', role: 'System',
      pain_point: 'Verifying SMTP config on Railway'
    });
    res.json({ ok, gmail_user: process.env.GMAIL_USER, has_password: !!process.env.GMAIL_APP_PASSWORD });
  } catch (err: any) {
    res.status(500).json({ error: err.message, code: err.code });
  }
});

app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/leads', leadsRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// JSON error handler (keeps responses clean instead of HTML stack traces)
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[error]', err.message);
  res.status(400).json({ error: 'Bad request' });
});

app.listen(PORT, () => {
  console.log(`[aerozag-backend] listening on port ${PORT}`);
});

export default app;
