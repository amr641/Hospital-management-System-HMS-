"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = bootstrab;
const globalHandeling_1 = require("../middlewares/globalHandeling");
const appointment_routes_1 = require("./appointment/appointment.routes");
const ineventory_routes_1 = require("./inventory/ineventory.routes");
const patient_routes_1 = require("./patient/patient.routes");
const room_routes_1 = require("./room/room.routes");
const user_routes_1 = require("./users/user.routes");
const express_1 = __importDefault(require("express"));
function bootstrab(app) {
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });
    let baseUrl = "/api/v1";
    app.use(express_1.default.json());
    app.use(`${baseUrl}/users`, user_routes_1.userRouter);
    app.use(`${baseUrl}/rooms`, room_routes_1.roomRouter);
    app.use(`${baseUrl}/inventories`, ineventory_routes_1.inventoryRouter);
    app.use(`${baseUrl}/patients`, patient_routes_1.patientRouter);
    app.use(`${baseUrl}/appointments`, appointment_routes_1.appointmentRouter);
    // global err handeling midlleware
    app.use(globalHandeling_1.globalHandeling);
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Rejection:", err);
    });
}
