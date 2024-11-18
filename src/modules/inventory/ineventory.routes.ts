import { Router } from "express";
import { verfifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import * as ic from "./inventory.controller"

export const inventoryRouter = Router()
inventoryRouter
    .use(verfifyToken, allowedTo(Roles.STAFF))

    .post("/",ic.addItem)
    .get("/",ic.getAllItems)
    .get("/:id",ic.getItem)
    .patch("/:id",ic.updateItem)
    .delete("/:id",ic.deleteItem)