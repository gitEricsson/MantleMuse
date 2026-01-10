// src/lib/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@/drizzle/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// For Aiven PostgreSQL with SSL
const isAivenDatabase = process.env.DATABASE_URL.includes("aivencloud.com");

// Modify connection string to use no-verify SSL mode for Aiven
let connectionString = process.env.DATABASE_URL;
if (isAivenDatabase && connectionString.includes("sslmode=require")) {
  connectionString = connectionString.replace(
    "sslmode=require",
    "sslmode=no-verify",
  );
  console.log("✅ Using no-verify SSL mode for Aiven database");
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: isAivenDatabase
    ? {
        rejectUnauthorized: false,
      }
    : false,
  max: parseInt(process.env.DATABASE_POOL_MAX || "10"),
  min: parseInt(process.env.DATABASE_POOL_MIN || "2"),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("connect", () => {
  console.log("✅ Connected to the database");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

export { pool };
export const db = drizzle(pool, { schema });
