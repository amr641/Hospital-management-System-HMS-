"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReportValidation = exports.generateReportValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const generateReportValidation = joi_1.default.object({
    result: joi_1.default.string()
        .min(1)
        .max(45)
        .required()
        .messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 1 character long.',
        'string.max': 'Result must be no longer than 45 characters.',
        'any.required': 'Result is required.'
    }),
    patient_id: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'Patient ID must be a number.',
        'number.integer': 'Patient ID must be an integer.',
    }),
    appointment_id: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'Appointment ID must be a number.',
        'number.integer': 'Appointment ID must be an integer.',
    }),
    createdBy: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'CreatedBy must be a number.',
        'number.integer': 'CreatedBy must be an integer.',
    }),
});
exports.generateReportValidation = generateReportValidation;
const updateReportValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    result: joi_1.default.string()
        .min(1)
        .max(45)
        .optional()
        .messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 1 character long.',
        'string.max': 'Result must be no longer than 45 characters.',
    }),
    patient_id: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'Patient ID must be a number.',
        'number.integer': 'Patient ID must be an integer.',
    }),
    appointment_id: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'Appointment ID must be a number.',
        'number.integer': 'Appointment ID must be an integer.',
    }),
    createdBy: joi_1.default.number()
        .integer()
        .allow(null)
        .messages({
        'number.base': 'CreatedBy must be a number.',
        'number.integer': 'CreatedBy must be an integer.',
    }),
});
exports.updateReportValidation = updateReportValidation;
