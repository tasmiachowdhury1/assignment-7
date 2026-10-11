require("dotenv").config({ path: ".env" });
const { MongoClient } = require("mongodb");

const uri = process.env.BETTER_AUTH_DB_URL;

async function main() {
    if (!uri) {
        console.error("❌ BETTER_AUTH_DB_URL is missing from .env");
        process.exitCode = 1;
        return;
    }

    if (!uri.startsWith("mongodb://") &&
        !uri.startsWith("mongodb+srv://")) {
        console.error("❌ BETTER_AUTH_DB_URL must start with mongodb:// or mongodb+srv://");
        process.exitCode = 1;
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

main();