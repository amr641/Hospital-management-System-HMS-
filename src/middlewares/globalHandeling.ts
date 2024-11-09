import { NextFunction, Request, Response } from "express";
import { Err } from "joi";

export const globalHandeling = (error: { status: number; message: any; stack: any; }, req: Request, res: Response, next: NextFunction) => {
  let statusCode = error.status || 500;
  res
    .status(statusCode)
    .json({ message: error.message, status: statusCode, stack: error.stack });
};
