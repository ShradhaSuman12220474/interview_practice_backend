import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// Define the type for environment variables
interface Env {
  DB_URL: string;
  GOOGLE_GENERATIVE_AI_API_KEY:string;
  JWT_SECRET: string;
}

// Helper function to safely get env vars
function getEnvVar(key: keyof Env): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

// Export strongly-typed environment variables
export const DB_URL = getEnvVar("DB_URL");
export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const GOOGLE_GENERATIVE_AI_API_KEY = getEnvVar("GOOGLE_GENERATIVE_AI_API_KEY");

