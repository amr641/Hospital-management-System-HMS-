import Joi from "joi";

const addItemValidation = Joi.object({
    item_name: Joi.string()
        .min(2)  // Ensures the length is at least 2 characters
        .max(20) // Ensures the length is at most 20 characters
        .required(),

    category: Joi.string()
        .min(2)  // Ensures the length is at least 2 characters
        .max(50) // Ensures the length is at most 50 characters
        .required(),

    quantity: Joi.number()
        .integer()  // Ensures it's an integer
        .min(1)     // Ensures quantity is at least 1
        .required(),

    Supplier_SSN: Joi.number()
        .integer()  // Ensures it's an integer
        .required(),

    handled_by: Joi.number()
        .integer()  // Ensures it's an integer
        .required(),
});
const updateItemValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    item_name: Joi.string()
        .min(2)  // Ensures the length is at least 2 characters
        .max(20) // Ensures the length is at most 20 characters
        .required(),

    category: Joi.string()
        .min(2)  // Ensures the length is at least 2 characters
        .max(50) // Ensures the length is at most 50 characters
        .required(),

    quantity: Joi.number()
        .integer()  // Ensures it's an integer
        .min(1)     // Ensures quantity is at least 1
        .required(),

    Supplier_SSN: Joi.number()
        .integer()  // Ensures it's an integer
        .required(),

    handled_by: Joi.number()
        .integer()  // Ensures it's an integer
        .required(),
});
export {
    addItemValidation,
    updateItemValidation
}