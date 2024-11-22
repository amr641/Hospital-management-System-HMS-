import Joi from 'joi';

// Joi validation schema for the Bill model
const generateBillValidation = Joi.object({
    amount: Joi.string()
        .max(45)
        .required()
        .messages({
            'string.base': 'Amount must be a string.',
            'string.empty': 'Amount is required.',
            'string.max': 'Amount must not exceed 45 characters.',
            'any.required': 'Amount is required.',
        }),

    patient_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Patient ID must be a number.',
            'number.integer': 'Patient ID must be an integer.',
            'number.positive': 'Patient ID must be a positive number.',
            'any.required': 'Patient ID is required.',
        }),

    createdBy: Joi.number()
        .integer()
        .positive()
        .allow(null) // Optional, allowing `null` for nullable references
        .messages({
            'number.base': 'Created By must be a number.',
            'number.integer': 'Created By must be an integer.',
            'number.positive': 'Created By must be a positive number.',
        }),
});
const updateBillValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    amount: Joi.string()
        .max(45)
        .optional()
        .messages({
            'string.base': 'Amount must be a string.',
            'string.empty': 'Amount is required.',
            'string.max': 'Amount must not exceed 45 characters.',
        }),

    patient_id: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'Patient ID must be a number.',
            'number.integer': 'Patient ID must be an integer.',
            'number.positive': 'Patient ID must be a positive number.',
        }),

    createdBy: Joi.number()
        .integer()
        .positive()
        .allow(null) // Optional, allowing `null` for nullable references
        .messages({
            'number.base': 'Created By must be a number.',
            'number.integer': 'Created By must be an integer.',
            'number.positive': 'Created By must be a positive number.',
        }),
});

export {
    generateBillValidation,
    updateBillValidation
}
