import { NextFunction, Request, Response } from "express";
import { Patient } from "../../config/schemas/patient.schema";
import { AppError } from "../utils/appError";
import Room from "../../config/schemas/room.schema";
import { PatientType } from "../modules/patient/patient.controller";
import { RoomType } from "../modules/room/room.controller";

const checkPatientExistence = async (req: Request, res: Response, next: NextFunction) => {
    let patient: PatientType = await Patient.findByPk(req.body.patient_id)
    if (!patient) throw new AppError("Patient Not Found", 404)
    next()
}
const checkRoomExistence = async (req: Request, res: Response, next: NextFunction) => {
    let room: RoomType = await Room.findByPk(req.body.room_id)
    if (!room) throw new AppError("room Not Found", 404)
    if (room.department !== req.body.department) throw new AppError("Department mismatch. Please verify the room and department.", 400)
    if (!room.availability) throw new AppError("room is not available", 400)
    next()
}
export {
    checkPatientExistence,
    checkRoomExistence
}