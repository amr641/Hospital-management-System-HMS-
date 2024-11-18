import Joi from "joi";
import { Roles } from "./Roles.ENUMS"; // Import your Roles enum or object

// Convert Roles enum/object to an array of valid values
const rolesArray = Object.values(Roles);

const signUpValidation = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name must not exceed 100 characters",
            "any.required": "Name is required",
        }),
    SSN: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "SSN must be a number",
            "number.integer": "SSN must be an integer",
            "any.required": "SSN is required",
        }),
    password: Joi.string()
        .min(8)
        .max(255)
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password must not exceed 255 characters",
            "any.required": "Password is required",
        }),
    email: Joi.string()
        .email()
        .max(45)
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.max": "Email must not exceed 45 characters",
            "any.required": "Email is required",
        }),
    department: Joi.string()
        .max(100)
        .default("no department")
        .messages({
            "string.max": "Department must not exceed 100 characters",
        }),
    role: Joi.string()
        .valid(...rolesArray)
        .default(Roles.STAFF)
        .optional()
});
// login validation
const loginValidation = Joi.object({
    SSN: Joi.number().integer().required().messages({
        "number.base": "SSN must be a number",
        "number.integer": "SSN must be an integer",
        "any.required": "SSN is required",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "any.required": "Password is required",
    }),
})
const updateUserValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    name: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
            "string.base": "Name must be a string",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name must not exceed 100 characters",

        }),
    SSN: Joi.number()
        .integer()
        .optional()
        .messages({
            "number.base": "SSN must be a number",
            "number.integer": "SSN must be an integer",
        }),
    password: Joi.string()
        .min(8)
        .max(255)
        .optional()
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password must not exceed 255 characters",
        }),
    email: Joi.string()
        .email()
        .max(45)
        .optional()
        .messages({
            "string.email": "Invalid email format",
            "string.max": "Email must not exceed 45 characters",
        }),
    department: Joi.string()
        .max(100)
        .default("no department")
        .messages({
            "string.max": "Department must not exceed 100 characters",
        }),
    role: Joi.string()
        .valid(...rolesArray)
        .default(Roles.STAFF)
        .optional()
});
const onlyIdNeededValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    })
})


export {
    signUpValidation,
    loginValidation,
    updateUserValidation,
    onlyIdNeededValidation,

}