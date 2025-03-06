import { Request, Response, NextFunction } from "express";
import { ValidationError as JoiValidationError } from "joi";
import { ValidationError, ResourceNotFoundError } from "../types/customError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Joi validation errors
  if (err instanceof JoiValidationError) {
    statusCode = 400;
    message = "Validation Error";
  }

  // Handle custom validation errors
  if (err instanceof ValidationError) {
    statusCode = err.statusCode;
    message = err.message || "Error validating data";
  }

  // Handle resource not found errors
  if (err instanceof ResourceNotFoundError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle unauthorized errors
  if (err.statusCode === 401) {
    statusCode = 401;
    message = "You are Unauthorized to access this resource";
  }

  // Handle forbidden errors
  if (err.statusCode === 403) {
    statusCode = 403;
    message = "You are forbidden from accessing this resource";
  }

  // Handle bad request errors
  if (err.statusCode === 400) {
    statusCode = 400;
    message = "Bad Request";
  }

  // Handle Method Not Allowed errors
  if (err.statusCode === 405) {
    statusCode = 405;
    message = "Method Not Allowed";
  }

  // Handle Prisma-specific errors
  if (err.code) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "This article URL already exists";
        break;
      case "P2025":
        statusCode = 404;
        message = "The requested article was not found";
        break;
    }
  }

  // Handle other errors
  if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};
