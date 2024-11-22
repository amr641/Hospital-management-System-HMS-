import { Router } from "express";
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";

export  const billRouter= Router()
billRouter.use(verifyToken,allowedTo(Roles.STAFF))