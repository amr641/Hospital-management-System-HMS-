import { Router } from "express";
import * as rc from "./room.controller"
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../../enums/Roles.ENUMS";
import validateRequest from "../../middlewares/validateRequest"
import * as rv from "./room.validator"
import { onlyIdNeededValidation } from "../users/user.validator";

export const roomRouter = Router()
roomRouter
    .use(verifyToken, allowedTo(Roles.STAFF))
    .post("/", validateRequest(rv.addRoomValidation), rc.addRoom)
    .get("/", rc.getAllRooms)
    .route("/:id")

    .get(validateRequest(onlyIdNeededValidation), rc.getRoom)
    .put(validateRequest(onlyIdNeededValidation), rc.restoreRoom)
    .patch(validateRequest(rv.updateRoomValidation), rc.updateRoom)
    .delete(validateRequest(onlyIdNeededValidation), rc.deleteRoom)