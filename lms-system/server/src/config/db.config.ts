import mongoose from "mongoose";
import { env } from "./env.config.js";

export default async function connectToDatabase() {
  try {
    const dbUrl = env.databaseUrl;
    await mongoose.connect(dbUrl);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
