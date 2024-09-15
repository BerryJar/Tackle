import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql", // "postgresql" | "mysql"
    schema: "app/lib/db/schema.ts",
    dbCredentials: {
        url: process.env.DB_URL!
    },
})