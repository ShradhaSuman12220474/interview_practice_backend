"use strict";
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/serverConfig';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwtToken = void 0;
// export const generateJwtToken = (payload)=>{
//     return jwt.sign(payload,JWT_SECRET,{expiresIn:'1d'});
// };
// export const verifyToken = (token)=>{
//     return jwt.verify(token,JWT_SECRET);
// }
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serverConfig_1 = require("../config/serverConfig");
// Ensure secret is defined
if (!serverConfig_1.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const generateJwtToken = (payload, expiresIn) => {
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, serverConfig_1.JWT_SECRET, options);
};
exports.generateJwtToken = generateJwtToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, serverConfig_1.JWT_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map