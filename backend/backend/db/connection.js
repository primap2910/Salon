require("dotenv").config();
let { MongoClient } = require("mongodb");
let url = process.env.MONGODB_URL;

// FIX: Singleton pattern — ek j connection reuse thay
let client = null;
let dbInstance = null;

let connectDb = async () => {
    if (dbInstance) return dbInstance;
    client = await MongoClient.connect(url);
    dbInstance = client.db("salon_platform");
    console.log("DB connected");
    return dbInstance;
};

module.exports = { connectDb };
