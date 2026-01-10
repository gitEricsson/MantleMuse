import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@/drizzle/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const isAiven = process.env.DATABASE_URL.includes("aivencloud.com");
let connectionString = process.env.DATABASE_URL;

if (isAiven && connectionString.includes("sslmode=require")) {
  connectionString = connectionString.replace(
    "sslmode=require",
    "sslmode=no-verify",
  );
}

const pool = new Pool({
  connectionString,
  ssl: isAiven ? { rejectUnauthorized: false } : false,
  max: parseInt(process.env.DATABASE_POOL_MAX || "10"),
  min: parseInt(process.env.DATABASE_POOL_MIN || "2"),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("Database error:", err);
  process.exit(-1);
});

export { pool };
export const db = drizzle(pool, { schema });
