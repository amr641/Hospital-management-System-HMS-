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
exports.generateReport = void 0;
const report_schema_1 = require("../../../config/schemas/report.schema");
const generateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let report = yield report_schema_1.Report.create({
        result: req.body.result,
        appointment_id: req.body.appointment_id,
        patient_id: req.body.appointment_id,
        createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId
    });
    res.status(200).json({ message: "success", report });
});
exports.generateReport = generateReport;
