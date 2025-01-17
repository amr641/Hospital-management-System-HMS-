import { globalHandeling } from "../middlewares/globalHandeling";
import { appointmentRouter } from "./appointment/appointment.routes";
import { billRouter } from "./bill/bill.routes";
import { inventoryRouter } from "./inventory/ineventory.routes";
import { patientRouter } from "./patient/patient.routes";
import { reportRouter } from "./report/report.routes";
import { roomRouter } from "./room/room.routes";
import { userRouter } from "./users/user.routes";
import express from "express"
import { Express } from "express"

export function bootstrab(app: Express) {
    process.on("uncaughtException", (err: Error) => {
        console.error("Uncaught Exception:", err);
    });
    let baseUrl = "/api/v1";
    app.use(express.json())
    app.use(`${baseUrl}/users`, userRouter)
    app.use(`${baseUrl}/rooms`, roomRouter)
    app.use(`${baseUrl}/inventories`, inventoryRouter)
    app.use(`${baseUrl}/patients`, patientRouter)
    app.use(`${baseUrl}/appointments`, appointmentRouter)
    app.use(`${baseUrl}/reports`, reportRouter)
    app.use(`${baseUrl}/bills`, billRouter)
    // global err handeling midlleware
    app.use(globalHandeling)

    process.on("unhandledRejection", (err: Error) => {
        console.error("Unhandled Rejection:", err);
    });
}