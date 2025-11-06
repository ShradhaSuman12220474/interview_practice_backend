import { ICustomError } from "../types/customError";
export declare class AppError extends Error implements ICustomError {
    status: number;
    isOperational: boolean;
    code?: string;
    details?: Record<string, any>;
    constructor(message: string, status?: number, options?: {
        code?: string;
        details?: Record<string, any>;
        isOperational?: boolean;
    });
}
//# sourceMappingURL=appError.d.ts.map