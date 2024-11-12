import { globalHandeling } from "../middlewares/globalHandeling";
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
    // global err handeling midlleware
    app.use(globalHandeling)

    process.on("unhandledRejection", (err: Error) => {
        console.error("Unhandled Rejection:", err);
    });
}