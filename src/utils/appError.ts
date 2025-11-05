// src/utils/AppError.ts
import { ICustomError } from "../types/customError";

export class AppError extends Error implements ICustomError {
  public status: number;
  public isOperational: boolean;
  public code?: string;
  public details?: Record<string, any>;

  constructor(
    message: string,
    status: number = 500,
    options?: {
      code?: string;
      details?: Record<string, any>;
      isOperational?: boolean;
    }
  ) {
    super(message);
    this.status = status;
    this.isOperational = options?.isOperational ?? true;

    // Fix prototype chain (important for instanceof checks)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
