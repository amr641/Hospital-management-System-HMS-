import { Router } from "express";
import { allowedTo, login, signUp } from "../../middlewares/auth";
import * as uc from "./user.controller"
import { verfifyToken } from "../../middlewares/verifiyToken";
import { Roles } from "./Roles.ENUMS";
import validateRequest from "../../middlewares/validateRequest"
import * as uv from "./user.validator"

export const userRouter = Router()
// user signs up
userRouter
    .post('/signUp', validateRequest(uv.signUpValidation), signUp)
    .post("/logIn", validateRequest(uv.loginValidation), login)

    .use(verfifyToken, allowedTo(Roles.ADMIN, Roles.MANAGER))
    // only admins and managers can access these endpoints
    .get("/", uc.getAllUsers)
    .route("/:id")
    .put(validateRequest(uv.onlyIdNeededValidation), uc.restoreUser)
    .get(validateRequest(uv.onlyIdNeededValidation), uc.getUser)
    .patch(validateRequest(uv.updateUserValidation), uc.updateUser)
    .delete(validateRequest(uv.onlyIdNeededValidation), uc.deleteUser)