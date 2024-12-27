import { Request, Response } from "express";
import { IReport } from "../../interfaces/report.INTF";
import { Report } from "../../../config/schemas/report.schema";
import { AppError } from "../../utils/appError";
type ReportType = IReport | null
let noReportsMessage: AppError = new AppError("We Have No Reports In The System", 404)
let reportNotFound: AppError = new AppError("Report Not Found", 404)

const generateReport = async (req: Request, res: Response) => {
    let report: IReport = await Report.create({
        result: req.body.result,
        appointment_id: req.body.appointment_id,
        patient_id: req.body.patient_id,
        createdBy: req.user?.userId
    })
    res.status(201).json({ message: "success", report })
}
const getAllReports = async (req: Request, res: Response) => {
    let reports: ReportType[] = await Report.findAll()
    if (!reports.length) throw noReportsMessage
    res.status(200).json({ message: "success", reports })
}
const getAllPatientReports = async (req: Request, res: Response) => {
    let reports: ReportType[] = await Report.findAll({ where: { patient_id: req.params.id } })
    if (!reports.length) throw noReportsMessage
    res.status(200).json({ message: "success", reports })
}

const getreport = async (req: Request, res: Response) => {
    let report: ReportType = await Report.findByPk(req.params.id)
    if (!report) throw reportNotFound
    res.status(200).json({ message: "success", report })
}

const updateReport = async (req: Request, res: Response) => {
    let report: ReportType = await Report.findByPk(req.params.id)
    if (!report) throw reportNotFound
    await Report.update(req.body, { where: { id: report.id } })
    res.status(201).json({ message: "success", report })
}
const deleteReport = async (req: Request, res: Response) => {
    let report: ReportType = await Report.findByPk(req.params.id)
    if (!report) throw reportNotFound
    await Report.destroy({ where: { id: report.id } })
    res.status(200).json({ message: "success", report })
}
const restoreReport = async (req: Request, res: Response) => {
    let report: ReportType = await Report.findByPk(req.params.id, { paranoid: false })
    if (!report) throw reportNotFound
    await report.restore()
    res.status(200).json({ message: `room with id ${report.id} restored successfully` })
}
export {
    generateReport,
    getAllReports,
    getAllPatientReports,
    getreport,
    updateReport,
    deleteReport,
    restoreReport
}