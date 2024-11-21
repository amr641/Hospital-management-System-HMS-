import { Request, Response } from "express";
import { IReport } from "./report.INTF";
import { Report } from "../../../config/schemas/report.schema";
type ReportType = IReport | null

const generateReport = async (req: Request, res: Response) => {
    let report: IReport = await Report.create({
        result: req.body.result,
        appointment_id: req.body.appointment_id,
        patient_id: req.body.appointment_id,
        createdBy: req.user?.userId
    })
    res.status(200).json({ message: "success", report })
}
export {
    generateReport
}