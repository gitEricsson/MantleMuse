# Deployment Checklist

## Environment Variables (Vercel)

Required variables:
```
DATABASE_URL=your_aiven_postgresql_url
NODE_TLS_REJECT_UNAUTHORIZED=0
NEXTAUTH_SECRET=run: openssl rand -base64 32
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

## Steps

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy
5. Run database seed: `POST https://your-domain.vercel.app/api/seed`

## Test

- Login: `admin@mantlemuse.com` / `admin123`
- Visit: `/admin`

Done.