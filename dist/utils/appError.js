"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status = 500, options) {
        super(message);
        this.status = status;
        this.isOperational = options?.isOperational ?? true;
        // Fix prototype chain (important for instanceof checks)
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map