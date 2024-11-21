import { Router } from "express";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import { verifyToken } from "../../middlewares/verifiyToken";
import * as rc from "./report.controller"
import { checkAppointment, checkPatientExistence } from "../../middlewares/checkExistence";

export const reportRouter = Router()
reportRouter
    .use(verifyToken)
    .post("/", allowedTo(Roles.STAFF),
        checkPatientExistence,
        checkAppointment,
        rc.generateReport)