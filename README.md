# De Destination — Next.js App

A full-stack Nigerian food ordering app built with Next.js 14, NextAuth, Paystack, and Supabase.

## Tech Stack
- **Next.js 14** (App Router)
- **NextAuth.js** — Google + Email (magic link) authentication
- **Paystack** — Nigerian payment processing
- **Supabase** — Postgres database for orders & users
- **Zustand** — Cart state management
- **Tailwind CSS** — Styling

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

#### NextAuth Secret
Generate a secret:
```bash
openssl rand -base64 32
```

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add `http://localhost:3000` to Authorized origins
5. Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs

#### Supabase
1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Copy your Project URL and anon key from Settings → API

#### Paystack
1. Sign up at [paystack.com](https://paystack.com)
2. Go to Settings → API Keys & Webhooks
3. Copy your public and secret keys (use test keys for development)

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Update Google OAuth redirect URIs to include your production URL

---

## Features
- ✅ Google & Email (magic link) sign in
- ✅ Full menu with categories
- ✅ Cart with persistent state
- ✅ Paystack payment integration
- ✅ Order history page
- ✅ Supabase order storage
- ✅ Mobile-first responsive design
