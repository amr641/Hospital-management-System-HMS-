"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAppointment = exports.checkRoomExistence = exports.checkPatientExistence = void 0;
const patient_schema_1 = require("../../config/schemas/patient.schema");
const appError_1 = require("../utils/appError");
const room_schema_1 = __importDefault(require("../../config/schemas/room.schema"));
const appointment_schema_1 = require("../../config/schemas/appointment.schema");
const appointment_ENUM_1 = require("../modules/appointment/appointment.ENUM");
const checkPatientExistence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = yield patient_schema_1.Patient.findByPk(req.body.patient_id);
    if (!patient)
        throw new appError_1.AppError("Patient Not Found", 404);
    next();
});
exports.checkPatientExistence = checkPatientExistence;
const checkRoomExistence = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.findByPk(req.body.room_id);
    if (!room)
        throw new appError_1.AppError("room Not Found", 404);
    if (room.department !== req.body.department)
        throw new appError_1.AppError("Department mismatch. Please verify the room and department.", 400);
    if (!room.availability)
        throw new appError_1.AppError("room is not available", 400);
    // change the room  availabilty 
    room.availability = 0;
    yield room.save();
    next();
});
exports.checkRoomExistence = checkRoomExistence;
const checkAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let appointment = yield appointment_schema_1.Appointment.findByPk(req.body.appointment_id);
    if (!appointment)
        throw new appError_1.AppError("appointment does not exist", 404);
    if (appointment.status !== appointment_ENUM_1.Status.Completed)
        throw new appError_1.AppError("Report generation is only available for completed appointments.", 400);
    next();
});
exports.checkAppointment = checkAppointment;
