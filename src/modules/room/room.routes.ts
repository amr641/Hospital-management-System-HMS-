import { Router } from "express";
import * as rc from "./room.controller"
import { verfifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";

export const roomRouter = Router()
roomRouter
    .use(verfifyToken, allowedTo(Roles.STAFF))
    .post("/", rc.addRoom)
    .get("/", rc.getAllRooms)
    .route("/:id")
   
    .get(rc.getRoom)
    .put(rc.restoreRoom)
    .patch(rc.updateRoom)
    .delete(rc.deleteRoom)