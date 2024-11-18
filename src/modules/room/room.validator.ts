import Joi from 'joi';

const addRoomValidation = Joi.object({
    availability: Joi.number()
        .integer()
        .valid(0, 1)
        .required()
        .default(1),

    capacity: Joi.number()
        .integer()
        .min(1)
        .required(),

    department: Joi.string()
        .max(30)
        .required()
        .default("no department"),
});
const updateRoomValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    availability: Joi.number()
        .integer()
        .valid(0, 1)
        .optional()
        .default(1),

    capacity: Joi.number()
        .integer()
        .min(1)
        .optional(),

    department: Joi.string()
        .max(30)
        .optional()
        .default("no department"),
});


export {
    addRoomValidation,
    updateRoomValidation
}
