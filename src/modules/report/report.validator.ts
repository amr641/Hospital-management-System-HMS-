import Joi from "joi";

const generateReportValidation = Joi.object({
    result: Joi.string()
      .min(1)
      .max(45)
      .required()
      .messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 1 character long.',
        'string.max': 'Result must be no longer than 45 characters.',
        'any.required': 'Result is required.'
      }),
  
    patient_id: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'Patient ID must be a number.',
        'number.integer': 'Patient ID must be an integer.',
      }),
  
    appointment_id: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'Appointment ID must be a number.',
        'number.integer': 'Appointment ID must be an integer.',
      }),
  
    createdBy: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'CreatedBy must be a number.',
        'number.integer': 'CreatedBy must be an integer.',
      }),
  });
const updateReportValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    result: Joi.string()
      .min(1)
      .max(45)
      .optional()
      .messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 1 character long.',
        'string.max': 'Result must be no longer than 45 characters.',
      }),
  
    patient_id: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'Patient ID must be a number.',
        'number.integer': 'Patient ID must be an integer.',
      }),
  
    appointment_id: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'Appointment ID must be a number.',
        'number.integer': 'Appointment ID must be an integer.',
      }),
  
    createdBy: Joi.number()
      .integer()
      .allow(null)
      .messages({
        'number.base': 'CreatedBy must be a number.',
        'number.integer': 'CreatedBy must be an integer.',
      }),
  });
  export {
    generateReportValidation,
    updateReportValidation
  }