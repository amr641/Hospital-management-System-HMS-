import { Router } from "express";
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../users/Roles.ENUMS";
import * as ic from "./inventory.controller";
import * as iv from "./inventory.validator";
import validateReauest from "../../middlewares/validateRequest"
import { onlyIdNeededValidation } from "../users/user.validator";

export const inventoryRouter = Router()
inventoryRouter
    .use(verifyToken, allowedTo(Roles.STAFF,Roles.PHARMACIST))

    .post("/", validateReauest(iv.addItemValidation), ic.addItem)
    .get("/", ic.getAllItems)
    .get("/:id", validateReauest(onlyIdNeededValidation), ic.getItem)
    .patch("/:id", validateReauest(iv.updateItemValidation), ic.updateItem)
    .delete("/:id", validateReauest(onlyIdNeededValidation), ic.deleteItem)