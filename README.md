# AeroZag

AI-powered passenger experience layer for regional airlines.

## 🚀 Live Sites

- **Frontend:** https://aerozag-landing.netlify.app
- **Backend API:** https://aerozag-backend-production.up.railway.app

## 📁 Structure

```
aerozag/
├── frontend/          # Netlify: static landing page + demo modal + chat widget
│   ├── index.html     # Full site, ~1500 lines (styles + scripts inlined)
│   ├── assets/        # Favicon, icons, logo mark
│   └── netlify.toml   # Caching & security headers
│
└── backend/           # Railway: Node/TS/Express API
    ├── src/
    │   ├── db/        # SQLite schema + connection
    │   ├── routes/    # /api/chat, /api/leads endpoints
    │   ├── services/  # OpenRouter integration, email, lead persistence
    │   ├── prompts/   # SDR system prompt + tool definitions
    │   └── index.ts   # Express app, CORS, rate limiting
    ├── Dockerfile     # Railway deployment
    └── railway.toml   # Railway config
```

## 🎯 Product

AeroZag's first product: an AI-powered passenger chatbot for airlines that handles:
- **Query Resolution** — answers 80%+ of passenger questions instantly
- **In-chat Add-on Sales** — surfaces upsells and completes payment without leaving chat
- **Smart Escalation** — raises human tickets only when truly needed

## 🤖 SDR Chatbot

The landing-page chat widget ("Zara") is a **conversion SDR**, not a support bot. It:
- Listens before pitching (discovers airline + pain)
- Never claims customers (no Fly91 name-drop)
- Qualifies leads and pushes toward demo booking
- Captures contact info + stores in SQLite on Railway

## 🛠️ Tech Stack

- **Frontend:** Static HTML + CSS + vanilla JS. No build step. Deployed to Netlify.
- **Backend:** Node 20 + TypeScript + Express. SQLite for persistence. OpenRouter (`z-ai/glm-5.2`) for LLM. Deployed to Railway.
- **Payments & Compliance:** Demo modal collects airline + qualification data; real payment flows use per-airline pricing (no fake numbers).

## 🚢 Deploy

### Frontend (Netlify)
```bash
cd frontend
netlify deploy --prod --dir . --site 5f577583-ccd2-4222-a354-34c471a06210
```

### Backend (Railway)
```bash
cd backend
railway variables --set "GMAIL_APP_PASSWORD=..."  # if enabling email
railway up --detach
```

## 📝 Notes

- **Gmail SMTP:** Currently placeholder in production. Set via Railway CLI to enable lead-notification emails (leads persist to DB regardless).
- **Admin token:** Check Railway env vars for `ADMIN_TOKEN` (use with `GET /api/leads` to read captured leads).
- **CORS:** Locked to `https://aerozag-landing.netlify.app`. Disallowed origins get no CORS headers.

## 📚 Related Docs

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

Built by Claude Code. Intelligence Born of the Sky. ✈️
