import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something Went Wrong !";
  let error = err;
  if (err instanceof Prisma.PrismaClientValidationError) {
    (message = "Validation Error"), (error = err.message);
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const errorFind = `${error.meta.modelName} Table Target Fields ${error.meta.target}`;
      (message = errorFind), (error = err.meta);
    }
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    statusCode,
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
