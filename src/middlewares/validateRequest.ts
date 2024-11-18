import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { Schema } from "joi"; // Assuming you're using Joi for validation

/**
 * Middleware to validate request data against a provided schema.
 * @param schema - Joi validation schema
 * @param statusCode - HTTP status code for validation errors (default: 400)
 * @returns Middleware function for validation
 */
const validate = (schema: Schema, statusCode: number = 400) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(
            {
                ...req.body,
                ...req.params,
                ...req.query,
            },
            { abortEarly: false }
        );

        if (!error) {
            return next();
        }

        // Extract and format validation errors
        const errors = error.details.map((detail) => detail.message);

        // Pass errors to the centralized error handler
        next(new AppError(errors.join(", "), statusCode));
    };
};

export default validate;
