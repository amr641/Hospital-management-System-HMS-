import { Request, Response } from "express";
import { IBill } from "./bill.INTF";
import { Bill } from "../../../config/schemas/bill.schema";
import { AppError } from "../../utils/appError";
import { PatientType } from "../patient/patient.controller";
import { Patient } from "../../../config/schemas/patient.schema";

type BillType = IBill | null // Bill custom type

let billNotFound = new AppError("Bill Not Found", 404)

const generateBill = async (req: Request, res: Response): Promise<void> => {
    let bill: IBill = await Bill.create({
        amount: req.body.amount,
        patient_id: req.body.patient_id,
        createdBy: req.user?.userId
    })
    res.status(201).json({ message: "success", bill })
}

const getBill = async (req: Request, res: Response): Promise<void> => {
    let bill: BillType = await Bill.findByPk(req.params.id);
    if (!bill) throw billNotFound
    res.status(200).json({ message: "success", bill })
}

const getAllBills = async (req: Request, res: Response): Promise<void> => {
    let bills: BillType[] = await Bill.findAll()
    if (!bills.length) throw new AppError("We Have No Bills In The System", 404)
    res.status(200).json({ message: "success", bills })
}

const updateBill = async (req: Request, res: Response): Promise<void> => {
    let bill: BillType = await Bill.findByPk(req.params.id);
    if (!bill) throw billNotFound

    if (req.body.patient_id) {  // patientId provided case
        let patient: PatientType = await Patient.findByPk(req.body.patient_id)
        if (!patient) throw new AppError("Patient Not Found", 404)
    }

    await Bill.update(req.body, { where: { id: bill.id } })
    res.status(201).json({ message: "success", bill })
}

const deleteBill = async (req: Request, res: Response): Promise<void> => {
    let bill: BillType = await Bill.findByPk(req.params.id);
    if (!bill) throw billNotFound
    await Bill.destroy({ where: { id: bill.id } })
    res.status(200).json({ message: "success" })
}
export {
    generateBill,
    getBill,
    getAllBills,
    updateBill,
    deleteBill
}