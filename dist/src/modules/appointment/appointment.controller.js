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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.acceptAppointment = exports.getAppointment = exports.getPatientAppointments = exports.getAllAppointments = exports.addAppointmnet = void 0;
const appointment_schema_1 = require("../../../config/schemas/appointment.schema");
const appError_1 = require("../../utils/appError");
const Roles_ENUMS_1 = require("../users/Roles.ENUMS");
const patient_schema_1 = require("../../../config/schemas/patient.schema");
const appointment_ENUM_1 = require("./appointment.ENUM");
const sequelize_1 = require("sequelize");
let appointmentNotFound = new appError_1.AppError("appointment not found", 404);
// add appointment
const addAppointmnet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let appointment = yield appointment_schema_1.Appointment.findOne({ where: { patient_id: req.body.patient_id } });
    if (appointment)
        throw new appError_1.AppError("Patient already has an Appointment", 400);
    req.body.staff_SSN = (_a = req.user) === null || _a === void 0 ? void 0 : _a.SSN;
    yield appointment_schema_1.Appointment.create(req.body);
    res.status(200).json({ message: "success" });
});
exports.addAppointmnet = addAppointmnet;
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) == Roles_ENUMS_1.Roles.STAFF) {
        let appointments = yield appointment_schema_1.Appointment.findAll({
            include: {
                model: patient_schema_1.Patient, // Include the associated Patient model
                attributes: ["id", "name"]
            }
        });
        if (!appointments.length)
            throw new appError_1.AppError("We Have No Appointment on The System", 404);
        // Dynamic Appointment Completing
        yield appointment_schema_1.Appointment.update({ status: appointment_ENUM_1.Status.Completed }, {
            where: {
                date: { [sequelize_1.Op.lte]: new Date() }
            }
        });
        res.status(200).json({ message: "success", appointments });
    }
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) == Roles_ENUMS_1.Roles.DOCTOR) {
        let appointments = (yield appointment_schema_1.Appointment.findAll({
            where: { department: req.user.department }, include: {
                model: patient_schema_1.Patient, // Include the associated Patient model
                attributes: ["id", "name"]
            }
        }));
        if (!appointments.length)
            throw new appError_1.AppError("We Have No Appointment on The System", 404);
        res.status(200).json({ message: "success", appointments });
    }
});
exports.getAllAppointments = getAllAppointments;
// retrive the patient appointment history
const getPatientAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let appointments = yield appointment_schema_1.Appointment.findAll({ where: { patient_id: req.params.id } });
    if (!appointments.length)
        throw new appError_1.AppError("Patient has No Appointments", 404);
    res.status(200).json({ message: "success", appointments });
});
exports.getPatientAppointments = getPatientAppointments;
// get appointment
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let appointment = yield appointment_schema_1.Appointment.findByPk(req.params.id);
    if (!appointment)
        throw appointmentNotFound;
    res.status(200).json({ message: "success", appointment });
});
exports.getAppointment = getAppointment;
// doctor accept the appointment
const acceptAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // appointment acceptance here is updating the appointment by adding the doctor_id
    let appointment = yield appointment_schema_1.Appointment.findByPk(req.params.id);
    if (!appointment)
        throw appointmentNotFound;
    yield appointment_schema_1.Appointment.update({ doctor_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }, { where: { id: req.params.id } });
    res.status(200).json({ message: "appointment accepted successfully" });
});
exports.acceptAppointment = acceptAppointment;
// update Appointment
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let appointment = yield appointment_schema_1.Appointment.findByPk(req.params.id);
    if (!appointment)
        throw appointmentNotFound;
    if (req.body.date)
        appointment.status = appointment_ENUM_1.Status.Rescheduled;
    yield appointment_schema_1.Appointment.update(req.body, { where: { id: appointment.id } });
    res.status(200).json({ message: "success", appointment });
});
exports.updateAppointment = updateAppointment;
// delete Appointment
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let appointment = yield appointment_schema_1.Appointment.findByPk(req.params.id);
    if (!appointment)
        throw appointmentNotFound;
    yield appointment_schema_1.Appointment.destroy({ where: { id: appointment.id } });
    res.status(200).json({ message: "success" });
});
exports.deleteAppointment = deleteAppointment;
