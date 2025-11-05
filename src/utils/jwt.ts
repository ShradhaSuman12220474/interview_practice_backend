// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/serverConfig';

// export const generateJwtToken = (payload)=>{
//     return jwt.sign(payload,JWT_SECRET,{expiresIn:'1d'});
// };

// export const verifyToken = (token)=>{
//     return jwt.verify(token,JWT_SECRET);
// }

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig";

// Ensure secret is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  email?: string;
  name: string;
  // add any other fields you usually include in your JWT
}

export const generateJwtToken = (
  payload: TokenPayload,
  expiresIn: number
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
