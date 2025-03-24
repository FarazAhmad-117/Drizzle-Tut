import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import fs from "fs";

const certificate = fs.readFileSync("./src/certificate/ca.pem");
console.log("Here is file:", certificate);

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
  ssl: {
    ca: certificate,
  },
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  await migrationClient.end();
}

main();
