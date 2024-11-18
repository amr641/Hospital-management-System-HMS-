import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import User from "../../config/schemas/user.schema";


declare global {
  // extending the Request type globaly
  namespace Express {
    interface Request {
      user?: {
        userId: number
        name: string;
        email: string;
        iat: number;
        role: string;
        SSN:number
      };

    }
  }
}
export const verfifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.headers?.token as string;
  jwt.verify(token, process.env.JWT_KEY as string || "secret", async (err: any, decoded: any) => {
    if (err) return next(new AppError("inavlid token", 401));

    let user = await User.findByPk(decoded?.userId)
    if (!user) return next(new AppError("user not found", 404));

    req.user = decoded;

    next();
  });
};
