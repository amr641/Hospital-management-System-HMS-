import { Router } from "express";
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import { checkPatientExistence, checkRoomExistence } from "../../middlewares/checkExistence";
import * as ac from "./appointment.controller";
import validataRequest from "../../middlewares/validateRequest"
import * as av from "./appointments.validator"
import { onlyIdNeededValidation } from "../users/user.validator";
export const appointmentRouter = Router()
appointmentRouter
    .use(verifyToken)
    // add appointment
    .post("/", allowedTo(Roles.STAFF, Roles.MANAGER),
        validataRequest(av.addAppointmentValidation),
        checkPatientExistence,
        checkRoomExistence,
        ac.addAppointmnet
    )
    // get all appointments based on role
    .get('/', allowedTo(Roles.STAFF,
         Roles.DOCTOR, Roles.MANAGER),
        ac.getAllAppointments)

    // accept appointment
    .patch("/:id/accept",
         allowedTo(Roles.DOCTOR),
        validataRequest(onlyIdNeededValidation),
        ac.acceptAppointment)

    .route("/:id")

    .get(allowedTo(Roles.STAFF),
     validataRequest(onlyIdNeededValidation),
      ac.getAppointment)

    .patch(allowedTo(Roles.STAFF),
     validataRequest(av.updateAppointmentValidation),
      ac.updateAppointment)

    .delete(allowedTo(Roles.STAFF, Roles.MANAGER),
     validataRequest(onlyIdNeededValidation),
      ac.deleteAppointment)
