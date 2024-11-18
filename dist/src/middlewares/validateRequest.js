"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../utils/appError");
/**
 * Middleware to validate request data against a provided schema.
 * @param schema - Joi validation schema
 * @param statusCode - HTTP status code for validation errors (default: 400)
 * @returns Middleware function for validation
 */
const validate = (schema, statusCode = 400) => {
    return (req, res, next) => {
        const { error } = schema.validate(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query), { abortEarly: false });
        if (!error) {
            return next();
        }
        // Extract and format validation errors
        const errors = error.details.map((detail) => detail.message);
        // Pass errors to the centralized error handler
        next(new appError_1.AppError(errors.join(", "), statusCode));
    };
};
exports.default = validate;
