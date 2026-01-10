// test-db-connection.cjs
// Simple script to test database connection outside of Next.js

const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Read .env.local file manually
function loadEnv() {
  const envPath = path.join(__dirname, ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      line = line.trim();
      if (line && !line.startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=");
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

loadEnv();

// Disable certificate verification for Aiven
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment variables");
  process.exit(1);
}

console.log("🔍 Testing database connection...");
console.log("📝 Database URL:", DATABASE_URL.replace(/:[^:@]+@/, ":****@"));

// Modify connection string to use no-verify SSL mode
let connectionString = DATABASE_URL;
if (connectionString.includes("sslmode=require")) {
  connectionString = connectionString.replace(
    "sslmode=require",
    "sslmode=no-verify",
  );
  console.log('✅ Changed SSL mode from "require" to "no-verify"');
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 1,
  connectionTimeoutMillis: 10000,
});

async function testConnection() {
  try {
    console.log("🔌 Attempting to connect...");
    const client = await pool.connect();
    console.log("✅ Successfully connected to database!");

    const result = await client.query("SELECT NOW(), version()");
    console.log("✅ Query executed successfully!");
    console.log("📅 Server time:", result.rows[0].now);
    console.log(
      "🗄️  PostgreSQL version:",
      result.rows[0].version.split(",")[0],
    );

    client.release();
    await pool.end();

    console.log("✅ Connection test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    await pool.end();
    process.exit(1);
  }
}

testConnection();
