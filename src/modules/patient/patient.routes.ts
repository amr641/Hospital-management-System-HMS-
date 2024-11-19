import { Router } from "express";
import { verfifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import * as pc from "./patient.controller";
import validateRequest from "../../middlewares/validateRequest"
import * as pv from "./patient.validator"
import { onlyIdNeededValidation } from "../users/user.validator";

export const patientRouter = Router()
patientRouter
    .use(verfifyToken, allowedTo(Roles.STAFF))
    .post("/", validateRequest(pv.addPatientValidation), pc.addPatient)

    .get("/", pc.getAllPatients)
    
    .route("/:id")
    .get(validateRequest(onlyIdNeededValidation), pc.getPatient)

    .patch(validateRequest(pv.updatePatientValidation), pc.updatePatient)

    .delete(validateRequest(onlyIdNeededValidation), pc.deletePatient)

    .put(validateRequest(onlyIdNeededValidation), pc.restorePatient)