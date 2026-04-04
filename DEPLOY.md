# Kai Deployment Guide

## Prerequisites
- Node.js 18+
- OpenAI API Key (for GPT-4o analysis)
- Vercel account (free tier works)

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/kai)

1. Click the button above (replace with your repo URL after pushing to GitHub)
2. Add environment variables:
   - `OPENAI_API_KEY` — your OpenAI API key
   - `JWT_SECRET` — random string for JWT signing
3. Click Deploy

### Option 2: Manual Deploy

```bash
# Push to GitHub first
git remote add origin https://github.com/YOUR_USERNAME/kai.git
git push -u origin main

# Then deploy via Vercel CLI
npm i -g vercel
vercel --prod
```

## Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `JWT_SECRET` | JWT signing secret | `abc123...` |
| `NEXT_PUBLIC_APP_URL` | App URL for CORS | `https://kai.vercel.app` |

## Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/kai.git
cd kai

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Initialize database
npx prisma db push

# Run dev server
npm run dev
```

Open http://localhost:3000

## Database

Uses SQLite with Prisma. For production:
- Vercel ephemeral filesystem won't persist SQLite
- Recommend: Turso (SQLite on edge) or PlanetScale
- See: https://pris.ly/migrate

## Troubleshooting

**AI analysis not working?**
- Check `OPENAI_API_KEY` is set and valid
- Check Vercel logs for API errors

**Build fails?**
- Run `npm run build` locally to debug
- Verify environment variables are set in Vercel dashboard
