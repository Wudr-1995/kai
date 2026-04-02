# Kai — AI Personal Memory Hub

**"你的所有AI对话，成为你的第二大脑"**

Kai 是 AI 时代的个人知识库：自动汇聚你所有的 AI 对话，智能提取精华，让你随时搜索、回顾、复用。

## Features

- **One-Click Import** — 粘贴任何 AI 对话文本，自动分析
- **AI-Powered Insights** — GPT-4o 自动提取关键洞察、标签、摘要
- **Instant Search** — 跨所有对话全文搜索
- **Personal Notes** — 为每个对话添加个人笔记
- **Multi-Source Support** — 支持 ChatGPT、Claude、其他 AI 工具

## Tech Stack

- **Framework**: Next.js 16 (App Router) + Tailwind CSS v4
- **Database**: SQLite + Prisma
- **AI**: OpenAI GPT-4o
- **Auth**: JWT

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your OPENAI_API_KEY

# Initialize database
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) |
| `JWT_SECRET` | JWT signing secret |
| `NEXT_PUBLIC_APP_URL` | App URL |

## Routes

- `/` — Landing page
- `/login` — Sign in
- `/register` — Create account
- `/kai/dashboard` — Main dashboard
- `/kai/import` — Import conversation
- `/kai/conversations/[id]` — Conversation detail

## API Endpoints

- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Sign in
- `GET /api/auth/me` — Get current user
- `POST /api/auth/logout` — Sign out
- `GET /api/conversations` — List conversations (query: `q`, `source`)
- `POST /api/conversations` — Import & analyze conversation
- `GET /api/conversations/[id]` — Get conversation
- `PATCH /api/conversations/[id]` — Update notes
- `DELETE /api/conversations/[id]` — Delete conversation

## License

MIT
