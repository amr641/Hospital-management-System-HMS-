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
exports.restoreReport = exports.deleteReport = exports.updateReport = exports.getreport = exports.getAllPatientReports = exports.getAllReports = exports.generateReport = void 0;
const report_schema_1 = require("../../../config/schemas/report.schema");
const appError_1 = require("../../utils/appError");
let noReportsMessage = new appError_1.AppError("We Have No Reports In The System", 404);
let reportNotFound = new appError_1.AppError("Report Not Found", 404);
const generateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let report = yield report_schema_1.Report.create({
        result: req.body.result,
        appointment_id: req.body.appointment_id,
        patient_id: req.body.patient_id,
        createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId
    });
    res.status(201).json({ message: "success", report });
});
exports.generateReport = generateReport;
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reports = yield report_schema_1.Report.findAll();
    if (!reports.length)
        throw noReportsMessage;
    res.status(200).json({ message: "success", reports });
});
exports.getAllReports = getAllReports;
const getAllPatientReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reports = yield report_schema_1.Report.findAll({ where: { patient_id: req.params.id } });
    if (!reports.length)
        throw noReportsMessage;
    res.status(200).json({ message: "success", reports });
});
exports.getAllPatientReports = getAllPatientReports;
const getreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let report = yield report_schema_1.Report.findByPk(req.params.id);
    if (!report)
        throw reportNotFound;
    res.status(200).json({ message: "success", report });
});
exports.getreport = getreport;
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let report = yield report_schema_1.Report.findByPk(req.params.id);
    if (!report)
        throw reportNotFound;
    yield report_schema_1.Report.update(req.body, { where: { id: report.id } });
    res.status(201).json({ message: "success", report });
});
exports.updateReport = updateReport;
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let report = yield report_schema_1.Report.findByPk(req.params.id);
    if (!report)
        throw reportNotFound;
    yield report_schema_1.Report.destroy({ where: { id: report.id } });
    res.status(200).json({ message: "success", report });
});
exports.deleteReport = deleteReport;
const restoreReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let report = yield report_schema_1.Report.findByPk(req.params.id, { paranoid: false });
    if (!report)
        throw reportNotFound;
    yield report.restore();
    res.status(200).json({ message: `room with id ${report.id} restored successfully` });
});
exports.restoreReport = restoreReport;
