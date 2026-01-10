import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

// Force Node.js runtime (required for bcrypt and database connections)
export const runtime = "nodejs";
