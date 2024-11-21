import { Router } from "express";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import { verifyToken } from "../../middlewares/verifiyToken";
import * as rc from "./report.controller"
import { checkAppointment, checkPatientExistence } from "../../middlewares/checkExistence";
import validateRequest from "../../middlewares/validateRequest";
import * as rv from "./report.validator"
import { onlyIdNeededValidation } from "../users/user.validator";
export const reportRouter = Router()
reportRouter
    .use(verifyToken, allowedTo(Roles.STAFF, Roles.MANAGER))
    .post("/",
        validateRequest(rv.generateReportValidation),
        checkPatientExistence,
        checkAppointment,
        rc.generateReport
    )
    .get("/", rc.getAllReports)
    .get("/:id/patient",
        validateRequest(onlyIdNeededValidation),
        rc.getAllPatientReports)
    .route("/:id")
    .get(validateRequest(onlyIdNeededValidation), rc.getreport)
    .patch(validateRequest(rv.updateReportValidation), rc.updateReport)
    .delete(validateRequest(onlyIdNeededValidation), rc.deleteReport)
    .put(validateRequest(onlyIdNeededValidation), rc.restoreReport)