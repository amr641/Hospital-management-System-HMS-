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
exports.restorePatient = exports.deletePatient = exports.updatePatient = exports.getPatient = exports.getAllPatients = exports.addPatient = void 0;
const patient_schema_1 = require("../../../config/schemas/patient.schema");
const appError_1 = require("../../utils/appError");
const addPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = yield patient_schema_1.Patient.findOne({ where: { phone_Number: req.body.phone_Number } });
    if (patient) {
        throw new appError_1.AppError("This patient already exists in the system.", 409);
    }
    yield patient_schema_1.Patient.create(req.body);
    res.status(201).json({ message: "success" });
});
exports.addPatient = addPatient;
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patients = yield patient_schema_1.Patient.findAll();
    if (!patients.length) {
        throw new appError_1.AppError("The System Is Out Of Patients", 404);
    }
    res.status(201).json({ message: "success", patients });
});
exports.getAllPatients = getAllPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = yield patient_schema_1.Patient.findByPk(req.params.id);
    if (!patient)
        throw new appError_1.AppError("Patient Not Found", 404);
    res.status(200).json({ message: "success", patient });
});
exports.getPatient = getPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let patient = yield patient_schema_1.Patient.findByPk(id);
    if (!patient)
        throw new appError_1.AppError("Patient not found", 404);
    yield patient_schema_1.Patient.update(req.body, { where: { id: patient.id } });
    res.status(200).json({ message: "success" });
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find the item
    const patient = yield patient_schema_1.Patient.findByPk(req.params.id);
    if (!patient)
        throw new appError_1.AppError("patient not found", 404);
    // destoy it
    yield patient_schema_1.Patient.destroy({ where: { id: patient.id } });
    res.status(200).json({ message: "success", patient });
});
exports.deletePatient = deletePatient;
const restorePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let patient = yield patient_schema_1.Patient.findByPk(req.params.id, { paranoid: false });
    if (!patient)
        throw new appError_1.AppError("patient not found", 404);
    yield patient.restore();
    res.status(200).json({ message: `patient with id ${patient.id} restored successfully` });
});
exports.restorePatient = restorePatient;
