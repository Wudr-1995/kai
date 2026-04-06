# Kai — AI Personal Memory Hub

**"你的所有AI对话，成为你的第二大脑"**

Kai 是 AI 时代的个人知识库：自动汇聚你所有的 AI 对话，智能提取精华，让你随时搜索、回顾、复用。

## ✨ Features

- **One-Click Import** — 粘贴任何 AI 对话文本，自动分析
- **AI-Powered Insights** — GPT-4o 自动提取关键洞察、标签、摘要
- **Instant Search** — 跨所有对话全文搜索
- **Personal Notes** — 为每个对话添加个人笔记
- **Multi-Source Support** — 支持 ChatGPT、Claude、其他 AI 工具
- **🔓 Demo Mode** — 无需 API Key 即可完整演示

## 🚀 Quick Start

### Option 1: Demo Mode (No API Key Required)

```bash
git clone https://github.com/Wudr-1995/kai.git
cd kai
npm install
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Demo Mode 自动激活（当 `OPENAI_API_KEY` 未设置时），使用智能模拟数据演示完整功能。

### Option 2: With Real AI

```bash
# 1. Clone the repo
git clone https://github.com/Wudr-1995/kai.git
cd kai

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# 编辑 .env，填入你的 API Key

# 4. Initialize database
npx prisma db push

# 5. Start development
npm run dev
```

## 🔑 API Configuration

Kai 支持多种 OpenAI 兼容 API：

### Volcano Engine (ByteDance) — 当前配置
```
OPENAI_API_KEY=your-volcano-key
OPENAI_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
```

### SiliconFlow (推荐，免费额度)
注册: https://siliconflow.cn
```
OPENAI_API_KEY=your-siliconflow-key
OPENAI_BASE_URL=https://api.siliconflow.cn/v1
```

### 标准 OpenAI
```
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
```

### 支持的模型 (示例)
- `doubao-pro-32k` / `doubao-pro-4k` (Volcano Engine)
- `deepseek-chat` / `deepseek-coder` (SiliconFlow)
- `gpt-4o` / `gpt-3.5-turbo` (OpenAI)

## 🚀 Deploy to Vercel

### One-Click Deploy

1. 访问: https://vercel.com/new/import?repository=https://github.com/Wudr-1995/kai
2. Framework: Next.js (自动检测)
3. Environment Variables (在 Vercel Dashboard 添加):

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | 你的 API Key |
| `OPENAI_BASE_URL` | API 端点 URL |
| `JWT_SECRET` | 随机字符串 |

4. 点击 Deploy

### 或使用 Vercel CLI

```bash
npm i -g vercel
cd kai
vercel --prod
```

## 📱 Chrome Extension

配套产品 [BookmarkGPT](https://github.com/Wudr-1995/bookmarkgpt) — AI Chrome 书签扩展，用浏览器内置 AI 无需 API Key。

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) + Tailwind CSS v4
- **Database**: SQLite + Prisma
- **AI**: OpenAI GPT-4o / Doubao / DeepSeek (OpenAI 兼容 API)
- **Auth**: JWT

## 📁 Project Structure

```
kai/
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── kai/          # Protected app routes
│   │   ├── api/          # API routes
│   │   └── page.tsx      # Landing page
│   ├── lib/
│   │   ├── auth.ts       # JWT authentication
│   │   ├── openai.ts     # AI integration + demo mode
│   │   └── prisma.ts     # Database client
│   └── types/
│       └── index.ts      # TypeScript types
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | 创建账号 |
| POST | `/api/auth/login` | 登录 |
| GET | `/api/auth/me` | 当前用户 |
| POST | `/api/auth/logout` | 登出 |
| GET | `/api/conversations` | 列表 (支持 q=搜索, source=来源) |
| POST | `/api/conversations` | 导入并分析对话 |
| GET | `/api/conversations/[id]` | 对话详情 |
| PATCH | `/api/conversations/[id]` | 更新笔记 |
| DELETE | `/api/conversations/[id]` | 删除对话 |

## ⚠️ 注意事项

- SQLite 数据库在本地开发可用，生产环境建议迁移到 Turso 或 PlanetScale
- Demo Mode 下 AI 分析使用模拟数据，仅用于演示
- 生产环境请更换 `JWT_SECRET`

## 📄 License

MIT
