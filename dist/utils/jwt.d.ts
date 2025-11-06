import { JwtPayload } from "jsonwebtoken";
export interface TokenPayload extends JwtPayload {
    userId: string;
    email?: string;
    name: string;
}
export declare const generateJwtToken: (payload: TokenPayload, expiresIn: number) => string;
export declare const verifyToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map