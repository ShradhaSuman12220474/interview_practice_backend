"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_GENERATIVE_AI_API_KEY = exports.JWT_SECRET = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env variables
dotenv_1.default.config();
// Helper function to safely get env vars
function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
    return value;
}
// Export strongly-typed environment variables
exports.DB_URL = getEnvVar("DB_URL");
exports.JWT_SECRET = getEnvVar("JWT_SECRET");
exports.GOOGLE_GENERATIVE_AI_API_KEY = getEnvVar("GOOGLE_GENERATIVE_AI_API_KEY");
//# sourceMappingURL=serverConfig.js.map