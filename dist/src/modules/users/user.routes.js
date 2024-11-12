"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const uc = __importStar(require("./user.controller"));
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const Roles_ENUMS_1 = require("./Roles.ENUMS");
exports.userRouter = (0, express_1.Router)();
// user signs up
exports.userRouter
    .post('/signUp', auth_1.signUp)
    .post("/logIn", auth_1.login)
    .use(verifiyToken_1.verfifyToken, (0, auth_1.allowedTo)(Roles_ENUMS_1.Roles.ADMIN, Roles_ENUMS_1.Roles.MANAGER))
    // only admins and managers can accessthis endpoint
    .get("/", uc.getAllUsers)
    .route("/:id")
    .get(uc.getUser)
    .patch(uc.updateUser)
    .delete(uc.deleteUser);
