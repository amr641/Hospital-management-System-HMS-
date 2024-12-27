import { Request, Response } from "express";
import { IAppointment } from "../../interfaces/appointment.INTF";
import { Appointment } from "../../../config/schemas/appointment.schema";
import { AppError } from "../../utils/appError";
import { Roles } from "../../enums/Roles.ENUMS";
import { Patient } from "../../../config/schemas/patient.schema";
import { Status } from "../../enums/appointment.ENUM";
import { Op } from "sequelize";

export type AppointmentType = IAppointment | null // appointmnent custom type

let appointmentNotFound = new AppError("appointment not found", 404)
// add appointment
const addAppointmnet = async (req: Request, res: Response): Promise<void> => {
    let appointment: AppointmentType = await Appointment.findOne({ where: { patient_id: req.body.patient_id } })
    if (appointment) throw new AppError("Patient already has an Appointment", 400)
    req.body.staff_SSN = req.user?.SSN
    await Appointment.create(req.body)
    res.status(200).json({ message: "success" })
}

const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    if (req.user?.role == Roles.STAFF) {
        let appointments: AppointmentType[] = await Appointment.findAll({
            include: {
                model: Patient, // Include the associated Patient model
                attributes: ["id", "name"]
            }
        })
        if (!appointments.length) throw new AppError("We Have No Appointment on The System", 404)
        // Dynamic Appointment Completing
        await Appointment.update(
            { status: Status.Completed },
            {
                where: {
                    date: { [Op.lte]: new Date() }
                }
            }
        );

        res.status(200).json({ message: "success", appointments })
    }
    if (req.user?.role == Roles.DOCTOR) {
        let appointments: AppointmentType[] = (await Appointment.findAll({
            where: { department: req.user.department }, include: {
                model: Patient, // Include the associated Patient model
                attributes: ["id", "name"]
            }
        }));
        if (!appointments.length) throw new AppError("We Have No Appointment on The System", 404)
        res.status(200).json({ message: "success", appointments })
    }
}
// retrive the patient appointment history
const getPatientAppointments = async (req: Request, res: Response): Promise<void> => {
    let appointments: AppointmentType[] = await Appointment.findAll({ where: { patient_id: req.params.id } })
    if (!appointments.length) throw new AppError("Patient has No Appointments", 404)
    res.status(200).json({ message: "success", appointments })
}
// get appointment
const getAppointment = async (req: Request, res: Response): Promise<void> => {
    let appointment: AppointmentType = await Appointment.findByPk(req.params.id)
    if (!appointment) throw appointmentNotFound
    res.status(200).json({ message: "success", appointment })
}

// doctor accept the appointment
const acceptAppointment = async (req: Request, res: Response): Promise<void> => {
    // appointment acceptance here is updating the appointment by adding the doctor_id
    let appointment: AppointmentType = await Appointment.findByPk(req.params.id)
    if (!appointment) throw appointmentNotFound
    await Appointment.update({ doctor_id: req.user?.userId }, { where: { id: req.params.id } })
    res.status(200).json({ message: "appointment accepted successfully" })
}

// update Appointment
const updateAppointment = async (req: Request, res: Response): Promise<void> => {
    let appointment: AppointmentType = await Appointment.findByPk(req.params.id)
    if (!appointment) throw appointmentNotFound
    if (req.body.date) appointment.status = Status.Rescheduled
    await Appointment.update(req.body, { where: { id: appointment.id } })
    res.status(200).json({ message: "success", appointment })
}
// delete Appointment
const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    let appointment: AppointmentType = await Appointment.findByPk(req.params.id)
    if (!appointment) throw appointmentNotFound

    await Appointment.destroy({ where: { id: appointment.id } })
    res.status(200).json({ message: "success" })
}

export {
    addAppointmnet,
    getAllAppointments,
    getPatientAppointments,
    getAppointment,
    acceptAppointment,
    updateAppointment,
    deleteAppointment

}