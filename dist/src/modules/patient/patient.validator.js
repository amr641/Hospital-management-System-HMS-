"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientValidation = exports.addPatientValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const addPatientValidation = joi_1.default.object({
    // Name validation
    name: joi_1.default.string()
        .min(2)
        .max(100)
        .required()
        .messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 2 characters.',
        'string.max': 'Name must not exceed 100 characters.',
    }),
    // DOB validation
    DOB: joi_1.default.date()
        .less('now') // Ensures DOB is in the past
        .required()
        .messages({
        'date.base': 'Date of Birth must be a valid date.',
        'date.less': 'Date of Birth must be in the past.',
        'any.required': 'Date of Birth is required.',
    }),
    // Gender validation
    gender: joi_1.default.string()
        .valid('male', 'female')
        .required()
        .messages({
        'any.only': 'Gender must be either "male" or "female".',
        'any.required': 'Gender is required.',
    }),
    // Phone number validation
    phone_Number: joi_1.default.string()
        .pattern(/^\d{10,11}$/) // Matches 10 or 11 numeric digits
        .required()
        .messages({
        'string.pattern.base': 'Phone number must be 10 or 11 digits long and numeric.',
        'string.empty': 'Phone number is required.',
    }),
    // Email validation (optional)
    email: joi_1.default.string()
        .email()
        .optional()
        .messages({
        'string.email': 'Email must be in a valid format.',
    }),
});
exports.addPatientValidation = addPatientValidation;
const updatePatientValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    // Name validation
    name: joi_1.default.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
        'string.base': 'Name must be a string.',
        'string.min': 'Name must be at least 2 characters.',
        'string.max': 'Name must not exceed 100 characters.',
    }),
    // DOB validation
    DOB: joi_1.default.date()
        .less('now') // Ensures DOB is in the past
        .optional()
        .messages({
        'date.base': 'Date of Birth must be a valid date.',
        'date.less': 'Date of Birth must be in the past.',
    }),
    // Gender validation
    gender: joi_1.default.string()
        .valid('male', 'female')
        .optional()
        .messages({
        'any.only': 'Gender must be either "male" or "female".',
    }),
    // Phone number validation
    phone_Number: joi_1.default.string()
        .pattern(/^\d{10,11}$/) // Matches 10 or 11 numeric digits
        .messages({
        'string.pattern.base': 'Phone number must be 10 or 11 digits long and numeric.',
    }),
    // Email validation (optional)
    email: joi_1.default.string()
        .email()
        .optional()
        .messages({
        'string.email': 'Email must be in a valid format.',
    }),
});
exports.updatePatientValidation = updatePatientValidation;
