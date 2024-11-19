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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = require("express");
const rc = __importStar(require("./room.controller"));
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const auth_1 = require("../../middlewares/auth");
const Roles_ENUMS_1 = require("../users/Roles.ENUMS");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rv = __importStar(require("./room.validator"));
const user_validator_1 = require("../users/user.validator");
exports.roomRouter = (0, express_1.Router)();
exports.roomRouter
    .use(verifiyToken_1.verifyToken, (0, auth_1.allowedTo)(Roles_ENUMS_1.Roles.STAFF))
    .post("/", (0, validateRequest_1.default)(rv.addRoomValidation), rc.addRoom)
    .get("/", rc.getAllRooms)
    .route("/:id")
    .get((0, validateRequest_1.default)(user_validator_1.onlyIdNeededValidation), rc.getRoom)
    .put((0, validateRequest_1.default)(user_validator_1.onlyIdNeededValidation), rc.restoreRoom)
    .patch((0, validateRequest_1.default)(rv.updateRoomValidation), rc.updateRoom)
    .delete((0, validateRequest_1.default)(user_validator_1.onlyIdNeededValidation), rc.deleteRoom);
