# AeroZag — Landing Page (Frontend)

Marketing landing page for **AeroZag**, the AI passenger-experience layer for regional airlines.

> *Intelligence Born of the Sky*

## Stack
- Single-page static site (`index.html`) — no build step
- Fonts: Inter + Lora (Google Fonts)
- Brand assets in `assets/`

## Local preview
```bash
python3 -m http.server 4280
# open http://localhost:4280
```

## Deploy (Netlify)
This repo includes `netlify.toml`. Connect the repo in Netlify and deploy — publish directory is the repo root, no build command required.

## Structure
```
index.html          # the full landing page (styles inlined)
assets/             # logo mark, favicon, PWA icons
netlify.toml        # Netlify config + headers
```

## Related
- Backend (Talk-to-Us capture + chatbot API) is a separate service hosted on Railway.
