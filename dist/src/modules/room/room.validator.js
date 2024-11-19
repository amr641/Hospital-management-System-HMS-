"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomValidation = exports.addRoomValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const addRoomValidation = joi_1.default.object({
    availability: joi_1.default.number()
        .integer()
        .valid(0, 1)
        .required()
        .default(1),
    capacity: joi_1.default.number()
        .integer()
        .min(1)
        .required(),
    department: joi_1.default.string()
        .max(30)
        .required()
        .default("no department"),
});
exports.addRoomValidation = addRoomValidation;
const updateRoomValidation = joi_1.default.object({
    id: joi_1.default.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    availability: joi_1.default.number()
        .integer()
        .valid(0, 1)
        .optional()
        .default(1),
    capacity: joi_1.default.number()
        .integer()
        .min(1)
        .optional(),
    department: joi_1.default.string()
        .max(30)
        .optional()
        .default("no department"),
});
exports.updateRoomValidation = updateRoomValidation;
