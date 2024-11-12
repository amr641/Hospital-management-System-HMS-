import { Router } from "express";
import { allowedTo, login, signUp } from "../../middlewares/auth";
import * as uc from "./user.controller"
import { verfifyToken } from "../../middlewares/verifiyToken";
import { Roles } from "./Roles.ENUMS";

export const userRouter = Router()
// user signs up
userRouter
    .post('/signUp', signUp)
    .post("/logIn", login)

    .use(verfifyToken, allowedTo(Roles.ADMIN, Roles.MANAGER))
    // only admins and managers can accessthis endpoint
    .get("/", uc.getAllUsers)
    .route("/:id")
    .get(uc.getUser)
    .patch(uc.updateUser)
    .delete(uc.deleteUser)