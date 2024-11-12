"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = bootstrab;
const globalHandeling_1 = require("../middlewares/globalHandeling");
const user_routes_1 = require("./users/user.routes");
const express_1 = __importDefault(require("express"));
function bootstrab(app) {
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });
    let baseUrl = "/api/v1";
    app.use(express_1.default.json());
    app.use(`${baseUrl}/users`, user_routes_1.userRouter);
    // global err handeling midlleware
    app.use(globalHandeling_1.globalHandeling);
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Rejection:", err);
    });
}
