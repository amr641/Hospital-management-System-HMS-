import { Request, Response} from "express";
import { Patient } from "../../../config/schemas/patient.schema";
import { AppError } from "../../utils/appError";

type PatientType = IPatient | null // patient custom type
const addPatient = async (req: Request, res: Response): Promise<void> => {
    let patient: PatientType = await Patient.findOne({ where: { phone_Number: req.body.phone_Number } })
    if (patient) {
        throw new AppError("This patient already exists in the system.", 409)
    }
    await Patient.create(req.body)
    res.status(201).json({ message: "success" })
}
const getAllPatients = async (req: Request, res: Response): Promise<void> => {
    let patients: IPatient[] | [] = await Patient.findAll()
    if (!patients.length) {
        throw new AppError("The System Is Out Of Patients", 404)
    }

    res.status(201).json({ message: "success", patients })
}
const getPatient = async (req: Request, res: Response): Promise<void> => {
    let patient: PatientType = await Patient.findByPk(req.params.id)

    if (!patient) throw new AppError("Patient Not Found", 404)
    res.status(200).json({ message: "success", patient })
}

const updatePatient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    let patient: PatientType = await Patient.findByPk(id)
    if (!patient) throw new AppError("Patient not found", 404)
    await Patient.update(req.body, { where: { id: patient.id } })


    res.status(200).json({ message: "success" })
}

const deletePatient = async (req: Request, res: Response): Promise<void> => {
    // find the item
    const patient: PatientType = await Patient.findByPk(req.params.id)
    if (!patient) throw new AppError("patient not found", 404)
    // destoy it
    await Patient.destroy({ where: { id: patient.id } })
    res.status(200).json({ message: "success", patient })
}

const restorePatient = async (req: Request, res: Response) => {
    let patient = await Patient.findByPk(req.params.id, { paranoid: false })
    if (!patient) throw new AppError("patient not found", 404)
    await patient.restore()
    res.status(200).json({ message: `patient with id ${patient.id} restored successfully` })
}
export {
    addPatient,
    getAllPatients,
    getPatient,
    updatePatient,
    deletePatient,
    restorePatient
}