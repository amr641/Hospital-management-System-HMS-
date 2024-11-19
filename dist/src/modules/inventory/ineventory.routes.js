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
exports.inventoryRouter = void 0;
const express_1 = require("express");
const verifiyToken_1 = require("../../middlewares/verifiyToken");
const auth_1 = require("../../middlewares/auth");
const Roles_ENUMS_1 = require("../users/Roles.ENUMS");
const ic = __importStar(require("./inventory.controller"));
const iv = __importStar(require("./inventory.validator"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validator_1 = require("../users/user.validator");
exports.inventoryRouter = (0, express_1.Router)();
exports.inventoryRouter
    .use(verifiyToken_1.verfifyToken, (0, auth_1.allowedTo)(Roles_ENUMS_1.Roles.STAFF))
    .post("/", (0, validateRequest_1.default)(iv.addItemValidation), ic.addItem)
    .get("/", ic.getAllItems)
    .get("/:id", (0, validateRequest_1.default)(user_validator_1.onlyIdNeededValidation), ic.getItem)
    .patch("/:id", (0, validateRequest_1.default)(iv.updateItemValidation), ic.updateItem)
    .delete("/:id", (0, validateRequest_1.default)(user_validator_1.onlyIdNeededValidation), ic.deleteItem);
