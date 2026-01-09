#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Mantle Muse - Setup Verification\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: Environment file
console.log('📄 Checking environment configuration...');
const envPath = join(rootDir, '.env');
if (!existsSync(envPath)) {
  console.log('   ❌ .env file not found');
  console.log('   → Run: cp .env.example .env');
  hasErrors = true;
} else {
  const envContent = readFileSync(envPath, 'utf-8');

  // Check DATABASE_URL
  if (!envContent.includes('DATABASE_URL=')) {
    console.log('   ❌ DATABASE_URL not set');
    hasErrors = true;
  } else if (envContent.includes('DATABASE_URL=postgresql://user:password')) {
    console.log('   ⚠️  DATABASE_URL still has default values');
    hasWarnings = true;
  } else {
    console.log('   ✅ DATABASE_URL configured');
  }

  // Check NEXTAUTH_SECRET
  if (!envContent.includes('NEXTAUTH_SECRET=')) {
    console.log('   ❌ NEXTAUTH_SECRET not set');
    console.log('   → Generate with: openssl rand -base64 32');
    hasErrors = true;
  } else if (envContent.includes('NEXTAUTH_SECRET=your-secret')) {
    console.log('   ⚠️  NEXTAUTH_SECRET still has default value');
    hasWarnings = true;
  } else {
    console.log('   ✅ NEXTAUTH_SECRET configured');
  }

  // Check NEXTAUTH_URL
  if (!envContent.includes('NEXTAUTH_URL=')) {
    console.log('   ❌ NEXTAUTH_URL not set');
    hasErrors = true;
  } else {
    console.log('   ✅ NEXTAUTH_URL configured');
  }
}

// Check 2: Node modules
console.log('\n📦 Checking dependencies...');
if (!existsSync(join(rootDir, 'node_modules'))) {
  console.log('   ❌ node_modules not found');
  console.log('   → Run: npm install');
  hasErrors = true;
} else {
  console.log('   ✅ Dependencies installed');
}

// Check 3: Next.js build files
console.log('\n⚙️  Checking Next.js configuration...');
if (existsSync(join(rootDir, 'next.config.js'))) {
  console.log('   ✅ next.config.js exists');
} else {
  console.log('   ❌ next.config.js not found');
  hasErrors = true;
}

// Check 4: Key directories
console.log('\n📁 Checking project structure...');
const requiredDirs = [
  'src/app',
  'src/components',
  'src/lib',
  'src/hooks',
  'drizzle',
  'public'
];

for (const dir of requiredDirs) {
  if (existsSync(join(rootDir, dir))) {
    console.log(`   ✅ ${dir}/ exists`);
  } else {
    console.log(`   ❌ ${dir}/ not found`);
    hasErrors = true;
  }
}

// Check 5: Key files
console.log('\n📝 Checking essential files...');
const requiredFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/lib/auth.ts',
  'src/lib/db.ts',
  'src/lib/storage.ts',
  'src/middleware.ts',
  'drizzle/schema.ts'
];

for (const file of requiredFiles) {
  if (existsSync(join(rootDir, file))) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} not found`);
    hasErrors = true;
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('\n❌ Setup incomplete - please fix the errors above\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  Setup complete with warnings\n');
  console.log('Next steps:');
  console.log('1. Update environment variables with real values');
  console.log('2. Run: npm run db:push');
  console.log('3. Run: npm run dev');
  console.log('4. Seed database: curl -X POST http://localhost:3000/api/seed\n');
  process.exit(0);
} else {
  console.log('\n✅ All checks passed!\n');
  console.log('Next steps:');
  console.log('1. Run: npm run db:push (if not done)');
  console.log('2. Run: npm run dev');
  console.log('3. Seed database: curl -X POST http://localhost:3000/api/seed');
  console.log('4. Login: http://localhost:3000/auth/login');
  console.log('   - Admin: admin@mantlemuse.com / admin123\n');
  process.exit(0);
}
