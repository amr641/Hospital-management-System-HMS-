import { Router } from "express";
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../../enums/Roles.ENUMS";
import * as pc from "./patient.controller";
import validateRequest from "../../middlewares/validateRequest"
import * as pv from "./patient.validator"
import { onlyIdNeededValidation } from "../users/user.validator";
import { getPatientAppointments } from "../appointment/appointment.controller";

export const patientRouter = Router()
patientRouter
    .use(verifyToken, allowedTo(Roles.STAFF))
    .post("/", validateRequest(pv.addPatientValidation), pc.addPatient)

    .get("/", pc.getAllPatients)

    .get("/:id/appointments", validateRequest(onlyIdNeededValidation), getPatientAppointments)

    .route("/:id")
    .get(validateRequest(onlyIdNeededValidation), pc.getPatient)

    .patch(validateRequest(pv.updatePatientValidation), pc.updatePatient)

    .delete(validateRequest(onlyIdNeededValidation), pc.deletePatient)

    .put(validateRequest(onlyIdNeededValidation), pc.restorePatient)