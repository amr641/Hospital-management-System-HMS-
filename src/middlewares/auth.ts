import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import dotEnv from "dotenv"
import User from "../../config/schemas/user.schema";
// user signing up
const signUp =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // check user exist or not
    let user = await User.findOne({ where: { SSN: req.body.SSN } })
    if (user)
      // if user exist
      throw new AppError("user already exist please login", 403)
    // ---------------------------*******----------------------------------
    let userData = {
      ...req.body,
      // hash the password
      password: bcrypt.hashSync(req.body.password, 10)
    }
    // add this user
    user = await User.create(userData)
    // generate the the jwt token with one hour expire date
    let token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_KEY as string || "secret",
      { expiresIn: "1h" }
    );
    // send the success response
    res.status(201).json({ message: "success", token });
  }

// login 
const login =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let user = await User.findOne({ where: { SSN: req.body.SSN } });
    // i used compare instead of comapareSync to avoid blocking the eventloop
    let passwordMatched = bcrypt.compare(req.body.password, user!.password).then((result) => {
      return result
    })
    if (!user || !passwordMatched!)
      throw new AppError("incorrect email or password", 403)
    // sign a token
    let token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_KEY as string || "secret"
    );
    res
      .status(200)
      .json({ message: `welcome back ${user.name}`, token });
  }

// authorization function 🛑🤚
const allowedTo = function (...roles: string[]) {

  return async (req: Request, res: Response, next: NextFunction) => {
  

console.log(req.user);


    if (!roles.includes(req.user?.role as string))
      throw new AppError('you are not authorized', 401)
    next()

  }
}

export {
  signUp,
  login,
  allowedTo
}