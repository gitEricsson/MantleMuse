# Mantle Muse

Invest in culture. Earn real yield.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables in `.env.local`:
```bash
DATABASE_URL=your_postgresql_url
NODE_TLS_REJECT_UNAUTHORIZED=0
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

3. Push database schema:
```bash
npm run db:push
```

4. Seed database (with dev server running):
```bash
npm run db:seed
```

5. Run development server:
```bash
npm run dev
```

## Demo Credentials

- Admin: `admin@mantlemuse.com` / `admin123`
- User: `user@mantlemuse.com` / `user123`

## Tech Stack

- Next.js 14
- PostgreSQL (Aiven)
- Drizzle ORM
- NextAuth
- TailwindCSS

## Production

Ensure these environment variables are set on Vercel:
- `DATABASE_URL`
- `NODE_TLS_REJECT_UNAUTHORIZED=0`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
