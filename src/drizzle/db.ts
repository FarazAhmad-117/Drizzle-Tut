import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import fs from "fs";

const certificate = fs.readFileSync("./src/certificate/ca.pem");

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
  ssl: {
    ca: certificate,
  },
});

export const db = drizzle(client, {
  schema,
  logger: true,
});
