"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemValidation = exports.addItemValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const addItemValidation = joi_1.default.object({
    item_name: joi_1.default.string()
        .min(2) // Ensures the length is at least 2 characters
        .max(20) // Ensures the length is at most 20 characters
        .required(),
    category: joi_1.default.string()
        .min(2) // Ensures the length is at least 2 characters
        .max(50) // Ensures the length is at most 50 characters
        .required(),
    quantity: joi_1.default.number()
        .integer() // Ensures it's an integer
        .min(1) // Ensures quantity is at least 1
        .required(),
    Supplier_SSN: joi_1.default.number()
        .integer() // Ensures it's an integer
        .required(),
    handled_by: joi_1.default.number()
        .integer() // Ensures it's an integer
        .required(),
});
exports.addItemValidation = addItemValidation;
const updateItemValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    item_name: joi_1.default.string()
        .min(2) // Ensures the length is at least 2 characters
        .max(20) // Ensures the length is at most 20 characters
        .required(),
    category: joi_1.default.string()
        .min(2) // Ensures the length is at least 2 characters
        .max(50) // Ensures the length is at most 50 characters
        .required(),
    quantity: joi_1.default.number()
        .integer() // Ensures it's an integer
        .min(1) // Ensures quantity is at least 1
        .required(),
    Supplier_SSN: joi_1.default.number()
        .integer() // Ensures it's an integer
        .required(),
    handled_by: joi_1.default.number()
        .integer() // Ensures it's an integer
        .required(),
});
exports.updateItemValidation = updateItemValidation;
