"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyIdNeededValidation = exports.updateUserValidation = exports.loginValidation = exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const Roles_ENUMS_1 = require("./Roles.ENUMS"); // Import your Roles enum or object
// Convert Roles enum/object to an array of valid values
const rolesArray = Object.values(Roles_ENUMS_1.Roles);
const signUpValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(100)
        .required()
        .messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must not exceed 100 characters",
        "any.required": "Name is required",
    }),
    SSN: joi_1.default.number()
        .integer()
        .required()
        .messages({
        "number.base": "SSN must be a number",
        "number.integer": "SSN must be an integer",
        "any.required": "SSN is required",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(255)
        .required()
        .messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password must not exceed 255 characters",
        "any.required": "Password is required",
    }),
    email: joi_1.default.string()
        .email()
        .max(45)
        .required()
        .messages({
        "string.email": "Invalid email format",
        "string.max": "Email must not exceed 45 characters",
        "any.required": "Email is required",
    }),
    department: joi_1.default.string()
        .max(100)
        .default("no department")
        .messages({
        "string.max": "Department must not exceed 100 characters",
    }),
    role: joi_1.default.string()
        .valid(...rolesArray)
        .default(Roles_ENUMS_1.Roles.STAFF)
        .optional()
});
exports.signUpValidation = signUpValidation;
// login validation
const loginValidation = joi_1.default.object({
    SSN: joi_1.default.number().integer().required().messages({
        "number.base": "SSN must be a number",
        "number.integer": "SSN must be an integer",
        "any.required": "SSN is required",
    }),
    password: joi_1.default.string().required().messages({
        "string.base": "Password must be a string",
        "any.required": "Password is required",
    }),
});
exports.loginValidation = loginValidation;
const updateUserValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    name: joi_1.default.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must not exceed 100 characters",
    }),
    SSN: joi_1.default.number()
        .integer()
        .optional()
        .messages({
        "number.base": "SSN must be a number",
        "number.integer": "SSN must be an integer",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(255)
        .optional()
        .messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password must not exceed 255 characters",
    }),
    email: joi_1.default.string()
        .email()
        .max(45)
        .optional()
        .messages({
        "string.email": "Invalid email format",
        "string.max": "Email must not exceed 45 characters",
    }),
    department: joi_1.default.string()
        .max(100)
        .default("no department")
        .messages({
        "string.max": "Department must not exceed 100 characters",
    }),
    role: joi_1.default.string()
        .valid(...rolesArray)
        .default(Roles_ENUMS_1.Roles.STAFF)
        .optional()
});
exports.updateUserValidation = updateUserValidation;
const onlyIdNeededValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    })
});
exports.onlyIdNeededValidation = onlyIdNeededValidation;
