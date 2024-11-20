"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentValidation = exports.addAppointmentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi validation schema with customized error messages
const addAppointmentValidation = joi_1.default.object({
    department: joi_1.default.string()
        .max(30)
        .required() // `department` is required and should not exceed 30 characters
        .messages({
        'string.base': 'Department must be a string.',
        'string.max': 'Department must be at most 30 characters long.',
        'any.required': 'Department is required.'
    }),
    staff_SSN: joi_1.default.number()
        .integer()
        .positive()
        .required() // `staff_SSN` is required and should be a positive integer
        .messages({
        'number.base': 'Staff SSN must be a number.',
        'number.integer': 'Staff SSN must be an integer.',
        'number.positive': 'Staff SSN must be a positive number.',
        'any.required': 'Staff SSN is required.'
    }),
    date: joi_1.default.date()
        .greater(new Date().toISOString()) // Ensures the date is after the current time
        .required() // `date` is required
        .messages({
        'date.base': 'Date must be a valid date.',
        'date.greater': 'Date must be in the future.',
        'any.required': 'Date is required.'
    }),
    doctor_id: joi_1.default.number()
        .integer()
        .positive()
        .allow(null) // `doctor_id` can be null or a positive integer
        .messages({
        'number.base': 'Doctor ID must be a number.',
        'number.integer': 'Doctor ID must be an integer.',
        'number.positive': 'Doctor ID must be a positive number.',
        'any.allowOnly': 'Doctor ID can be null or a positive number.'
    }),
    room_id: joi_1.default.number()
        .integer()
        .positive()
        .allow(null) // `room_id` can be null or a positive integer
        .messages({
        'number.base': 'Room ID must be a number.',
        'number.integer': 'Room ID must be an integer.',
        'number.positive': 'Room ID must be a positive number.',
        'any.allowOnly': 'Room ID can be null or a positive number.'
    })
});
exports.addAppointmentValidation = addAppointmentValidation;
const updateAppointmentValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    department: joi_1.default.string()
        .max(30)
        .optional() // `department` is required and should not exceed 30 characters
        .messages({
        'string.base': 'Department must be a string.',
        'string.max': 'Department must be at most 30 characters long.',
    }),
    staff_SSN: joi_1.default.number()
        .integer()
        .positive()
        .optional() // `staff_SSN` is required and should be a positive integer
        .messages({
        'number.base': 'Staff SSN must be a number.',
        'number.integer': 'Staff SSN must be an integer.',
        'number.positive': 'Staff SSN must be a positive number.',
    }),
    date: joi_1.default.date()
        .greater(new Date().toISOString()) // Ensures the date is after the current time
        .optional() // `date` is optional
        .messages({
        'date.base': 'Date must be a valid date.',
        'date.greater': 'Date must be in the future.',
    }),
    doctor_id: joi_1.default.number()
        .integer()
        .positive()
        .allow(null) // `doctor_id` can be null or a positive integer
        .messages({
        'number.base': 'Doctor ID must be a number.',
        'number.integer': 'Doctor ID must be an integer.',
        'number.positive': 'Doctor ID must be a positive number.',
        'any.allowOnly': 'Doctor ID can be null or a positive number.'
    }),
    room_id: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        'number.base': 'Room ID must be a number.',
        'number.integer': 'Room ID must be an integer.',
        'number.positive': 'Room ID must be a positive number.',
        'any.required': 'Room ID is required !.'
    })
});
exports.updateAppointmentValidation = updateAppointmentValidation;
