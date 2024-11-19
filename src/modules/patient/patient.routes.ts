import { Router } from "express";
import { verfifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import * as pc from "./patient.controller"

export const patientRouter = Router()
patientRouter
    .use(verfifyToken, allowedTo(Roles.STAFF))
    .post("/", pc.addPatient)
    .get("/", pc.getAllPatients)
    .route("/:id")
    .get(pc.addPatient)
    .patch(pc.updatePatient)
    .delete(pc.deletePatient)
    .put(pc.getPatient)