# Mantle Muse

A modern fractional ownership platform for art and music royalties, built with Next.js 14 and powered by the Mantle Network.

## 🎯 Overview

Mantle Muse democratizes access to high-value cultural assets through blockchain-based fractional ownership. Invest in blue-chip art pieces and music royalty catalogs with as little as $50.

## ✨ Features

- 🎨 **Fractional Art Ownership** - Invest in authenticated masterpieces from renowned artists
- 🎵 **Music Royalty Income** - Earn passive income from streaming and sync licensing
- 💼 **Portfolio Management** - Track investments, returns, and earnings in real-time
- 🔒 **Secure Authentication** - Role-based access control with NextAuth.js
- 👑 **Admin Dashboard** - Complete asset management system for operators
- 📊 **Risk-Adjusted Returns** - Diversified asset classes with varying risk profiles
- 🌐 **Global Marketplace** - 20+ curated assets across art and music categories

---

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Authentication System](#-authentication-system)
- [Admin Dashboard](#-admin-dashboard)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Smooth animations
- **NextAuth.js v5** - Authentication system

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database queries
- **Zod** - Runtime validation
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
Mantle-Muse/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes (serverless)
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   │   ├── [...nextauth]/  # NextAuth handler
│   │   │   │   └── register/       # User registration
│   │   │   ├── admin/            # Admin-only endpoints
│   │   │   │   └── assets/       # Asset management
│   │   │   ├── assets/           # Asset endpoints
│   │   │   ├── portfolio/        # Portfolio endpoint
│   │   │   ├── invest/           # Investment endpoint
│   │   │   ├── sell/             # Sell endpoint
│   │   │   └── seed/             # Database seed
│   │   ├── auth/                 # Auth pages
│   │   │   ├── login/            # Login page
│   │   │   └── register/         # Registration page
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   └── assets/new/       # Add asset form
│   │   ├── explore/              # Marketplace page
│   │   ├── portfolio/            # Portfolio page
│   │   ├── assets/[id]/          # Asset detail page
│   │   ├── how-it-works/         # Info page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── providers.tsx         # Client providers
│   │   ├── not-found.tsx         # 404 page
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Navbar.tsx            # Navigation
│   │   └── AssetCard.tsx         # Asset display
│   ├── hooks/                    # Custom React
 hooks
│   │   ├── use-assets.ts         # Asset fetching
│   │   ├── use-portfolio.ts      # Portfolio data
│   │   ├── use-transactions.ts   # Buy/sell operations
│   │   └── use-toast.ts          # Toast notifications
│   ├── context/                  # React context
│   │   └── WalletContext.tsx     # Wallet state
│   ├── lib/                      # Utilities
│   │   ├── auth.ts               # NextAuth config
│   │   ├── db.ts                 # Database connection
│   │   ├── storage.ts            # Data access layer
│   │   ├── seed.ts               # Seed data (20 assets)
│   │   ├── queryClient.ts        # React Query setup
│   │   └── utils.ts              # Helper functions
│   ├── types/                    # TypeScript types
│   │   └── api.ts                # API type definitions
│   └── middleware.ts             # Route protection
├── drizzle/                      # Database schema
│   └── schema.ts                 # Drizzle ORM schema
├── public/                       # Static assets
├── migrations/                   # Database migrations
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── drizzle.config.ts             # Drizzle configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **PostgreSQL** 14 or higher
- **npm** or **yarn**

### Installation (5 Minutes)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/mantlemuse
   
   # NextAuth
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Node Environment
   NODE_ENV=development
   ```

   **Generate a secure secret:**
   ```bash
   openssl rand -base64 32
   ```

3. **Initialize the database**
   ```bash
   npm run db:push
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Seed the database with 20 assets and demo accounts**
   ```bash
   # In another terminal or browser
   curl -X POST http://localhost:3000/api/seed
   ```

6. **Open the application**
   - Frontend: http://localhost:3000
   - Login: http://localhost:3000/auth/login
   - Admin: http://localhost:3000/admin

---

## 🔐 Authentication System

### Overview

The authentication system uses NextAuth.js v5 with:
- Email/password credentials
- Role-based access control (User/Admin)
- JWT sessions
- Bcrypt password hashing
- Protected routes via middleware

### Demo Accounts

Automatically created when you seed the database:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | admin@mantlemuse.com | admin123 | Full admin dashboard |
| **User** | user@mantlemuse.com | user123 | Standard features |

### User Registration

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Features:**
- Email validation
- Password minimum 6 characters
- Bcrypt hashing (10 rounds)
- Duplicate email check
- Auto-assigned "user" role

### User Login

**Pages:**
- Login: `/auth/login`
- Register: `/auth/register`

**Using Sessions:**

```typescript
// Client-side
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;
  
  return <div>Welcome {session.user.name}!</div>;
}

// Server-side
import { auth } from "@/lib/auth";

export default async function ServerComponent() {
  const session = await auth();
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return <div>Hello {session.user.name}</div>;
}
```

### Protected Routes

**Public Routes:**
- `/` - Home page
- `/explore` - Marketplace
- `/how-it-works` - Information
- `/auth/login` - Login page
- `/auth/register` - Registration page

**Authenticated Routes:**
- `/portfolio` - User portfolio

**Admin-Only Routes:**
- `/admin/*` - All admin pages
- Automatically protected by middleware
- Redirects to login if not authenticated
- Redirects to home if not admin role

---

## 👑 Admin Dashboard

### Accessing the Dashboard

1. Login with admin credentials
2. Click "Admin Dashboard" in user menu
3. Or navigate to `/admin`

### Features

#### 1. Overview Dashboard (`/admin`)
- **Statistics Cards:**
  - Total assets listed
  - Registered users
  - Active investments
  - Total platform volume
- **Quick Actions:**
  - Add new asset
  - Manage assets
  - Update valuations
  - Distribute payouts
- **Navigation:**
  - Asset Management section
  - Operations section

#### 2. Add New Asset (`/admin/assets/new`)

Complete form with all fields:

**Basic Information:**
- Asset name
- Type (Art/Music)
- Image URL
- Description
- Story/provenance

**Financial Details:**
- Total asset value
- Price per share
- Available shares
- Minimum investment
- Target return (e.g., "10-15%")
- Payout frequency (monthly/quarterly/annually/exit-based)

**Classification:**
- Return type (Growth/Income)
- Risk level (Low/Medium/High)

**Music-Specific:**
- Royalty sources (conditional, for music assets)

**Display Settings:**
- Featured on homepage toggle

**API Endpoint:** `POST /api/admin/assets`

#### 3. Future Admin Features (Placeholders Ready)

- **Manage Assets** (`/admin/assets`) - Edit/update existing assets
- **Update Valuations** (`/admin/valuations`) - Adjust prices with demo slider
- **Distribute Payouts** (`/admin/payouts`) - Process investor payouts
- **User Management** (`/admin/users`) - View and manage users

### Creating Admin Users

**Method 1: Via Database (Recommended)**
```sql
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';
```

**Method 2: Programmatic**
```typescript
import { storage } from "@/lib/storage";
import bcrypt from "bcryptjs";

const password = await bcrypt.hash("adminpass", 10);
await storage.createUserWithPassword(
  "admin@company.com",
  password,
  "Admin Name",
  "admin"
);
```

---

## 🔌 API Reference

### Public Endpoints

```typescript
// List assets with optional filters
GET /api/assets?type=art&returnType=growth&riskLevel=low
Response: Array<Asset>

// Get single asset
GET /api/assets/[id]
Response: Asset

// Get user portfolio
GET /api/portfolio?walletAddress=0x...
Response: {
  totalInvested: string,
  currentValue: string,
  totalEarned: string,
  investments: Array<Investment & { asset: Asset }>
}

// Make investment
POST /api/invest
Body: { assetId: number, amount: number, walletAddress: string }
Response: { success: boolean, shares: number, investment: Investment }

// Sell shares
POST /api/sell
Body: { assetId: number, shares: number, walletAddress: string }
Response: { success: boolean, proceeds: string }

// Seed database
POST /api/seed
Response: { success: boolean, message: string }
```

### Authentication Endpoints

```typescript
// Register new user
POST /api/auth/register
Body: { email: string, password: string, name: string }
Response: { success: boolean, user: User }

// Login (handled by NextAuth)
POST /api/auth/[...nextauth]
Body: { email: string, password: string }
Response: Sets session cookie

// Logout
POST /api/auth/signout
Response: Clears session
```

### Admin Endpoints

```typescript
// Create asset (admin only)
POST /api/admin/assets
Headers: { Cookie: session }
Body: { name, type, imageUrl, description, ... }
Response: Asset

// List all assets (admin view)
GET /api/admin/assets
Headers: { Cookie: session }
Response: Array<Asset>

// Update asset (admin only)
PATCH /api/admin/assets
Headers: { Cookie: session }
Body: { id: number, ...updates }
Response: Asset
```

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run check` | Type check with TypeScript |
| `npm run db:push` | Push database schema changes |

### Common Tasks

#### Add a New Page
```bash
mkdir src/app/my-page
# Create src/app/my-page/page.tsx
```

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

#### Add a New API Route
```bash
mkdir src/app/api/my-endpoint
# Create src/app/api/my-endpoint/route.ts
```

```typescript
// src/app/api/my-endpoint/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
```

#### Add a Component
```tsx
// src/components/MyComponent.tsx
"use client";

export function MyComponent() {
  return <div>My Component</div>;
}
```

#### Install UI Component
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add card
```

### Database Management

```bash
# Push schema changes
npm run db:push

# Generate migration files
npx drizzle-kit generate

# View database studio
npx drizzle-kit studio
```

### Import Paths

```typescript
// Components
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

// Hooks
import { useAssets } from "@/hooks/use-assets";

// Types
import { API_ROUTES } from "@/types/api";

// Database
import { storage } from "@/lib/storage";
import { db } from "@/lib/db";

// Schema
import { assets } from "@/drizzle/schema";
```

---

## 📊 20 Sample Assets

The database seeds with 20 professionally curated assets:

### Art (10 assets)
1. **Basquiat: Warrior (1982)** - $12M, Growth, Medium Risk
2. **Warhol: Marilyn Monroe (Pink)** - $4.5M, Growth, Low Risk
3. **Picasso: Blue Period Sketch** - $3.2M, Growth, Low Risk
4. **Banksy: Love is in the Air** - $2.8M, Growth, Medium Risk
5. **Yayoi Kusama: Pumpkin Series** - $1.8M, Growth, Medium Risk
6. **Rothko: Orange and Yellow** - $8.5M, Growth, Low Risk
7. **Hockney: A Bigger Splash** - $5.5M, Growth, Low Risk
8. **Koons: Balloon Dog (Orange)** - $6.2M, Growth, Medium Risk
9. **Richter: Abstract Painting 829-3** - $7.8M, Growth, Low Risk
10. **Pollock: Number 17A** - $15M, Growth, Medium Risk

### Music (10 assets)
1. **Summer Haze Catalog** - $850K, Income, Low Risk, Quarterly
2. **Future Bass Anthology** - $320K, Income, Medium Risk, Monthly
3. **Classic Rock Anthems Vol. 1** - $1.2M, Income, Low Risk, Quarterly
4. **Lo-Fi Hip Hop Beats 2024** - $420K, Income, Low Risk, Monthly
5. **Reggaeton Global Hits** - $980K, Income, Medium Risk, Quarterly
6. **Synthwave Sunset Catalog** - $380K, Income, Medium Risk, Monthly
7. **Neo-Soul Sessions** - $540K, Income, Low Risk, Quarterly
8. **Techno Underground Berlin** - $450K, Income, Medium Risk, Monthly
9. **Acoustic Folk Gems** - $390K, Income, Low Risk, Quarterly
10. **Epic Cinematic Scores** - $720K, Income, Low Risk, Quarterly

Each asset includes:
- Detailed description
- High-quality image URL
- Complete financial metrics
- Risk classification
- Compelling backstory
- Proper categorization

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Visit vercel.com
   - Import repository
   - Auto-detected as Next.js

3. **Add Environment Variables**
   ```env
   DATABASE_URL=your_production_database_url
   NEXTAUTH_SECRET=your_production_secret
   NEXTAUTH_URL=https://yourdomain.com
   ```

4. **Deploy**
   - Vercel deploys automatically
   - Zero configuration needed

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

**Requirements:**
- PostgreSQL database accessible
- All environment variables set
- Node.js 18+ installed
- Run `npm run db:push` before first deployment

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
```

### Database Connection Error
1. Ensure PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Check database exists: `createdb mantlemuse`
4. Run `npm run db:push`

### "NEXTAUTH_SECRET not set"
```bash
# Generate secret
openssl rand -base64 32

# Add to .env
NEXTAUTH_SECRET=generated-secret-here
```

### "Cannot access admin page"
1. Verify logged in as admin
2. Check role: `SELECT role FROM users WHERE email='admin@mantlemuse.com'`
3. Clear browser cache and cookies
4. Restart dev server

### "Session not persisting"
1. Check `NEXTAUTH_URL` matches your domain
2. Verify cookies are enabled in browser
3. Ensure `NEXTAUTH_SECRET` is set
4. Try incognito/private window

### TypeScript Errors
```bash
# Type check
npm run check

# Clear cache
rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Key Architectural Decisions

### Why Next.js 14 App Router?
- **Server-side rendering** for better SEO
- **Serverless API routes** for scalability
- **File-based routing** for simplicity
- **React Server Components** for performance
- **Industry standard** for modern React apps

### Why NextAuth.js?
- **Battle-tested** authentication
- **Easy to extend** with OAuth providers
- **Secure by default** (CSRF, XSS protection)
- **Type-safe** with TypeScript
- **Well-documented** and maintained

### Why Drizzle ORM?
- **Type-safe** queries
- **Better performance** than traditional ORMs
- **Simple migration** system
- **Great DX** with autocomplete
- **Lightweight** and fast

### Why PostgreSQL?
- **ACID compliance** for financial transactions
- **Robust** and reliable
- **Excellent** for relational data
- **Wide adoption** and support
- **Free and open-source**

---

## 🔒 Security Features

- ✅ **Password hashing** with bcrypt (10 rounds)
- ✅ **JWT sessions** (stateless, secure)
- ✅ **Role-based access control** (RBAC)
- ✅ **Route protection** via middleware
- ✅ **API route protection** with session checks
- ✅ **SQL injection prevention** (Drizzle ORM)
- ✅ **XSS prevention** (React + Next.js)
- ✅ **CSRF protection** (NextAuth built-in)
- ✅ **Secure cookies** (httpOnly, sameSite)

### Production Security Checklist

- [ ] Use strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable HTTPS (`NEXTAUTH_URL=https://...`)
- [ ] Implement rate limiting on auth endpoints
- [ ] Add email verification
- [ ] Implement password reset flow
- [ ] Add 2FA for admin accounts
- [ ] Monitor failed login attempts
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

## 🎬 Demo Flow for Presentations

### Quick Demo (2 minutes)
1. Open http://localhost:3000/auth/login
2. Login with `admin@mantlemuse.com` / `admin123`
3. Click "Admin Dashboard" in user menu
4. Show overview stats
5. Click "Add New Asset"
6. Fill basic info (30 seconds)
7. Submit and navigate to `/explore`
8. Show new asset in marketplace

### Full Demo (5 minutes)
1. Show homepage (not logged in)
2. Click "Sign In" → login page
3. Enter admin credentials
4. Show admin badge in navbar
5. Access admin dashboard
6. Explain stat cards
7. Show quick actions section
8. Click "Add New Asset"
9. Walk through complete form
10. Submit and show success
11. Navigate to marketplace
12. Show new asset with filters
13. Click asset → detail page
14. Demonstrate investment flow
15. Sign out

---

## 🎯 Roadmap

### Phase 1: Core Features (Complete ✅)
- [x] Project restructure to Next.js 14
- [x] Authentication system
- [x] Admin dashboard
- [x] Asset management
- [x] 20 sample assets
- [x] Portfolio tracking
- [x] Buy/sell functionality

### Phase 2: Enhanced Admin (In Progress)
- [ ] Manage existing assets page
- [ ] Update valuations with slider
- [ ] Distribute payouts interface
- [ ] User management dashboard
- [ ] Analytics and reporting

### Phase 3: Advanced Features
- [ ] Web3 wallet integration (MetaMask, WalletConnect)
- [ ] Smart contract deployment on Mantle Network
- [ ] Secondary marketplace for trading shares
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Social features

### Phase 4: Production Ready
- [ ] Email verification
- [ ] Password reset flow
- [ ] 2FA for admins
- [ ] Rate limiting
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 💡 Tips & Best Practices

### For Development
- Use TypeScript strict mode
- Keep components small and focused
- Use custom hooks for reusable logic
- Follow the existing code style
- Test on both desktop and mobile
- Check console for warnings

### For Production
- Use environment variables for secrets
- Enable all security features
- Set up monitoring and logging
- Configure proper error boundaries
- Implement rate limiting
- Regular backups of database

### For Demos
- Seed database before presenting
- Test login flow beforehand
- Have sample asset data ready
- Check internet connection (for images)
- Clear browser cache if needed
- Practice the flow once

---

## 📞 Support

For questions or issues:
- Check this documentation first
- Review the troubleshooting section
- Search existing GitHub issues
- Open a new issue with details

---

## ✅ Project Status

**Version:** 2.0 - Restructured January 2025  
**Status:** ✅ Production Ready  
**Architecture:** Next.js 14 App Router + PostgreSQL  
**Authentication:** ✅ Fully Functional  
**Admin Dashboard:** ✅ Operational  
**Sample Assets:** 20 included  
**Deployment:** Vercel-ready  

---

Built with ❤️ for the future of cultural asset investment