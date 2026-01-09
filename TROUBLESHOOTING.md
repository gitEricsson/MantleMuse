# Troubleshooting Guide

Quick solutions to common issues with Mantle Muse.

## 🚀 Quick Fixes

### "module is not defined in ES module scope"

**Error:**
```
ReferenceError: module is not defined in ES module scope
```

**Solution:**
The `next.config.js` file needs to use ES module syntax because `package.json` has `"type": "module"`.

✅ **Fixed!** The config now uses `export default` instead of `module.exports`.

If you still see this error:
```bash
# Verify the fix
cat next.config.js | grep "export default"
```

---

### Database Connection Failed

**Error:**
```
DATABASE_URL must be set. Did you forget to provision a database?
```

**Solution:**
1. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your database URL:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/mantlemuse
   ```

3. Ensure PostgreSQL is running:
   ```bash
   # Check if PostgreSQL is running
   psql --version
   pg_isready
   ```

4. Create database if needed:
   ```bash
   createdb mantlemuse
   ```

5. Push schema:
   ```bash
   npm run db:push
   ```

---

### NEXTAUTH_SECRET Not Set

**Error:**
```
Please define a NEXTAUTH_SECRET environment variable
```

**Solution:**
1. Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

2. Add to `.env`:
   ```env
   NEXTAUTH_SECRET=your-generated-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

---

### Port 3000 Already in Use

**Error:**
```
Port 3000 is already in use
```

**Solution:**
```bash
# Option 1: Kill the process
npx kill-port 3000

# Option 2: Use different port
PORT=3001 npm run dev

# Option 3 (Windows): Find and kill
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

---

### Cannot Access Admin Dashboard

**Issue:** Redirected to login or home when accessing `/admin`

**Solutions:**

1. **Not logged in:**
   - Go to `/auth/login`
   - Login with: `admin@mantlemuse.com` / `admin123`

2. **Wrong role:**
   ```bash
   # Check user role in database
   psql $DATABASE_URL -c "SELECT email, role FROM users WHERE email='admin@mantlemuse.com';"
   
   # Update to admin if needed
   psql $DATABASE_URL -c "UPDATE users SET role='admin' WHERE email='admin@mantlemuse.com';"
   ```

3. **Session not working:**
   - Clear browser cookies
   - Try incognito/private window
   - Check `NEXTAUTH_SECRET` is set
   - Restart dev server

---

### Session Not Persisting

**Issue:** Logged out after page refresh

**Solutions:**

1. Check environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000  # Must match your domain
   NEXTAUTH_SECRET=<your-secret>       # Must be set
   ```

2. Enable cookies in browser:
   - Chrome: Settings → Privacy → Cookies → Allow all
   - Firefox: Settings → Privacy → Accept cookies

3. Check for HTTPS issues:
   - Development: Use `http://localhost:3000`
   - Production: Use `https://yourdomain.com`

4. Clear cache and restart:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Registration Fails

**Issue:** Cannot create new users

**Solutions:**

1. Update database schema:
   ```bash
   npm run db:push
   ```

2. Check database connection:
   ```bash
   psql $DATABASE_URL -c "SELECT 1;"
   ```

3. Verify email is unique:
   ```bash
   psql $DATABASE_URL -c "SELECT email FROM users WHERE email='test@example.com';"
   ```

4. Check server logs for detailed error

---

### TypeScript Errors

**Issue:** Type errors preventing compilation

**Solutions:**

1. Check all type errors:
   ```bash
   npm run check
   ```

2. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. Update TypeScript:
   ```bash
   npm install -D typescript@latest
   ```

---

### Module Not Found

**Error:**
```
Module not found: Can't resolve '@/components/...'
```

**Solutions:**

1. Verify tsconfig.json paths:
   ```json
   {
     "paths": {
       "@/*": ["./src/*"]
     }
   }
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

---

### Database Seeding Fails

**Issue:** `POST /api/seed` returns error

**Solutions:**

1. Ensure dev server is running:
   ```bash
   npm run dev
   ```

2. Check database is empty or has few records:
   ```bash
   psql $DATABASE_URL -c "SELECT COUNT(*) FROM assets;"
   ```

3. Seed via browser:
   - Open: http://localhost:3000/api/seed
   - Should show success message

4. Check server logs for errors

---

### Build Fails

**Issue:** `npm run build` fails

**Solutions:**

1. Fix TypeScript errors first:
   ```bash
   npm run check
   ```

2. Fix ESLint warnings:
   ```bash
   npm run lint
   ```

3. Clear cache and rebuild:
   ```bash
   rm -rf .next
   npm run build
   ```

4. Check for missing dependencies:
   ```bash
   npm install
   ```

---

### Images Not Loading

**Issue:** Asset images not displaying

**Solutions:**

1. Check next.config.js image domains:
   ```javascript
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "images.unsplash.com" }
     ]
   }
   ```

2. Verify image URLs are valid
3. Check network tab for 403/404 errors
4. Use HTTPS URLs for images

---

### API Routes Not Working

**Issue:** API endpoints return 404

**Solutions:**

1. Verify file structure:
   ```
   src/app/api/assets/route.ts  ✅
   src/api/assets/route.ts      ❌ Wrong location
   ```

2. Check route.ts exports:
   ```typescript
   export async function GET(request: NextRequest) {
     // Must export GET, POST, etc.
   }
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

---

## 🔍 Verification Commands

Run these to verify your setup:

```bash
# 1. Check setup
npm run verify

# 2. Check TypeScript
npm run check

# 3. Check linting
npm run lint

# 4. Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# 5. Check if server is running
curl http://localhost:3000/api/assets
```

---

## 🐛 Debug Mode

Enable detailed logging:

```bash
# Enable debug for NextAuth
DEBUG=next-auth:* npm run dev

# Enable debug for Next.js
NODE_OPTIONS='--inspect' npm run dev
```

---

## 📞 Still Having Issues?

1. **Check the README:**
   - Full setup instructions
   - Architecture overview
   - API documentation

2. **Review server logs:**
   - Look for error messages in terminal
   - Check browser console for frontend errors

3. **Verify environment:**
   ```bash
   node --version    # Should be 18+
   npm --version     # Should be 9+
   psql --version    # Should be 14+
   ```

4. **Start fresh:**
   ```bash
   # Nuclear option - clean slate
   rm -rf node_modules .next
   npm install
   npm run db:push
   npm run dev
   ```

5. **Open an issue:**
   - Include error messages
   - Describe steps to reproduce
   - Mention Node.js and OS version

---

## ✅ Health Check

Quick verification that everything is working:

```bash
# 1. Environment configured
cat .env | grep DATABASE_URL
cat .env | grep NEXTAUTH_SECRET

# 2. Dependencies installed
ls node_modules | wc -l  # Should be 500+

# 3. Database accessible
psql $DATABASE_URL -c "SELECT COUNT(*) FROM assets;"

# 4. Server starts
npm run dev &
sleep 5
curl http://localhost:3000

# 5. API working
curl http://localhost:3000/api/assets

# 6. Login page accessible
curl -I http://localhost:3000/auth/login
```

---

## 🔒 Security Issues

### Exposed Secrets

If you accidentally committed secrets:

```bash
# 1. Regenerate secrets immediately
openssl rand -base64 32

# 2. Update .env
nano .env

# 3. Ensure .env is in .gitignore
echo ".env" >> .gitignore

# 4. Remove from git history (if committed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 📊 Performance Issues

### Slow Development Server

```bash
# 1. Clear cache
rm -rf .next

# 2. Disable experimental features in next.config.js
# Remove: experimental: { ... }

# 3. Reduce hot reload scope
# Edit next.config.js and add:
# watchOptions: { ignored: ['**/node_modules', '**/.git'] }
```

### Slow Database Queries

```sql
-- Check slow queries
SELECT * FROM pg_stat_statements 
ORDER BY mean_exec_time DESC LIMIT 10;

-- Add indexes if needed
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_users_email ON users(email);
```

---

**Last Updated:** January 2025  
**Project Version:** 2.0