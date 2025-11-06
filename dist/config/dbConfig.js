"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const serverConfig_1 = require("./serverConfig");
async function connectDB() {
    try {
        await mongoose_1.default.connect(serverConfig_1.DB_URL);
        console.log("connected to the mongoDB");
    }
    catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
//# sourceMappingURL=dbConfig.js.map