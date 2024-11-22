import Joi from 'joi';
import { Status } from '../../enums/appointment.ENUM';

// Joi validation schema with customized error messages
const addAppointmentValidation = Joi.object({

    department: Joi.string()
        .max(30)
        .required() // `department` is required and should not exceed 30 characters
        .messages({
            'string.base': 'Department must be a string.',
            'string.max': 'Department must be at most 30 characters long.',
            'any.required': 'Department is required.'
        }),

    staff_SSN: Joi.number()
        .integer()
        .positive()
        .optional() // `staff_SSN` is required and should be a positive integer
        .messages({
            'number.base': 'Staff SSN must be a number.',
            'number.integer': 'Staff SSN must be an integer.',
            'number.positive': 'Staff SSN must be a positive number.',

        }),
    patient_id: Joi.number()
        .integer()
        .positive() // `doctor_id` can be null or a positive integer
        .messages({
            'number.base': 'patient ID must be a number.',
            'number.integer': 'patient ID must be an integer.',
            'number.positive': 'patient ID must be a positive number.',

        }),
    status: Joi.string()
        .valid(...Object.values(Status))
        .default(Status.Scheduled)
        .optional(),


    date: Joi.date()
        .greater(new Date().toISOString()) // Ensures the date is after the current time
        .required() // `date` is required
        .messages({
            'date.base': 'Date must be a valid date.',
            'date.greater': 'Date must be in the future.',
            'any.required': 'Date is required.'
        }),

    doctor_id: Joi.number()
        .integer()
        .positive()
        .allow(null) // `doctor_id` can be null or a positive integer
        .messages({
            'number.base': 'Doctor ID must be a number.',
            'number.integer': 'Doctor ID must be an integer.',
            'number.positive': 'Doctor ID must be a positive number.',
            'any.allowOnly': 'Doctor ID can be null or a positive number.'
        }),

    room_id: Joi.number()
        .integer()
        .positive()
        .allow(null) // `room_id` can be null or a positive integer
        .messages({
            'number.base': 'Room ID must be a number.',
            'number.integer': 'Room ID must be an integer.',
            'number.positive': 'Room ID must be a positive number.',
            'any.allowOnly': 'Room ID can be null or a positive number.'
        })
});
const updateAppointmentValidation = Joi.object({
    id: Joi.number().integer().required().messages({
        "any.number": "id must be number",
        "any.integer": "id must be integer",
        "any.required": "id is required"
    }),
    department: Joi.string()
        .max(30)
        .optional() // `department` is required and should not exceed 30 characters
        .messages({
            'string.base': 'Department must be a string.',
            'string.max': 'Department must be at most 30 characters long.',

        }),
    status: Joi.string()
        .valid(...Object.values(Status))
        .default(Status.Scheduled)
        .optional(),

    staff_SSN: Joi.number()
        .integer()
        .positive()
        .optional() // `staff_SSN` is required and should be a positive integer
        .messages({
            'number.base': 'Staff SSN must be a number.',
            'number.integer': 'Staff SSN must be an integer.',
            'number.positive': 'Staff SSN must be a positive number.',

        }),

    date: Joi.date()
        .greater(new Date().toISOString()) // Ensures the date is after the current time
        .optional() // `date` is optional
        .messages({
            'date.base': 'Date must be a valid date.',
            'date.greater': 'Date must be in the future.',

        }),

    doctor_id: Joi.number()
        .integer()
        .positive()
        .allow(null) // `doctor_id` can be null or a positive integer
        .messages({
            'number.base': 'Doctor ID must be a number.',
            'number.integer': 'Doctor ID must be an integer.',
            'number.positive': 'Doctor ID must be a positive number.',
            'any.allowOnly': 'Doctor ID can be null or a positive number.'
        }),

    room_id: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'Room ID must be a number.',
            'number.integer': 'Room ID must be an integer.',
            'number.positive': 'Room ID must be a positive number.',
        })
});

export {
    addAppointmentValidation,
    updateAppointmentValidation
}
