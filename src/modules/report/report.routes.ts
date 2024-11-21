import { Router } from "express";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import { verifyToken } from "../../middlewares/verifiyToken";
import * as rc from "./report.controller"
import { checkAppointment, checkPatientExistence } from "../../middlewares/checkExistence";

export const reportRouter = Router()
reportRouter
    .use(verifyToken, allowedTo(Roles.STAFF, Roles.MANAGER))
    .post("/",
        checkPatientExistence,
        checkAppointment,
        rc.generateReport
    )
    .get("/", rc.getAllReports)
    .get("/:id/patient",
        rc.getAllPatientReports)
    .route("/:id")
    .get(rc.getreport)
    .patch(rc.updateReport)
    .delete(rc.deleteReport)
    .put(rc.restoreReport)