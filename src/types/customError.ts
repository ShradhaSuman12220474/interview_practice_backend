// src/types/CustomError.ts
export interface ICustomError extends Error {
  /** HTTP status code (e.g. 400, 404, 500) */
  status: number;

  /** Whether the error is expected (handled) or unexpected */
  isOperational: boolean;

  /** Optional error code string for internal tracking (e.g. "USER_NOT_FOUND") */
  code?: string;

  /** Optional metadata useful for debugging or logging */
  details?: Record<string, any>;
}
