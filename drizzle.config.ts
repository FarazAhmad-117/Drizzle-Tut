import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
// import fs from "fs";

config();

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    // ssl: {
    //   ca: fs.readFileSync("./src/certificate/ca.pem"),
    // },
  },
});
