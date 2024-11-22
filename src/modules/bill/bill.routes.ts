import { Router } from "express";
import { verifyToken } from "../../middlewares/verifiyToken";
import { allowedTo } from "../../middlewares/auth";
import { Roles } from "../../enums/Roles.ENUMS";
import * as bc from "./bill.controller"
import { checkPatientExistence } from "../../middlewares/checkExistence";
import validateRequest from "../../middlewares/validateRequest";
import * as bv from "./bill.validator"
import { onlyIdNeededValidation } from "../users/user.validator";

export const billRouter = Router()
billRouter
    .use(verifyToken, allowedTo(Roles.STAFF, Roles.MANAGER, Roles.ADMIN))
    .post("/",
        validateRequest(bv.generateBillValidation),
        checkPatientExistence,
        bc.generateBill
    )
    .get("/", bc.getAllBills)
    .route("/:id")

    .get(validateRequest(onlyIdNeededValidation), bc.getBill)
    .patch(validateRequest(bv.updateBillValidation),bc.updateBill)
    .delete(validateRequest(onlyIdNeededValidation),bc.deleteBill)