"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const user_schema_1 = __importDefault(require("../../../config/schemas/user.schema"));
const appError_1 = require("../../utils/appError");
// get all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield user_schema_1.default.findAll();
    if (!users.length)
        throw new appError_1.AppError("No users found.", 404);
    res.status(200).json({ message: "success", users });
});
exports.getAllUsers = getAllUsers;
// get user by primary key
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.findByPk(req.params.id);
    if (!user)
        throw new appError_1.AppError("user not found", 404);
    res.status(200).json({ message: "success", user });
});
exports.getUser = getUser;
// update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.update(req.body, { where: { id: req.params.id } });
    if (!user)
        throw new appError_1.AppError("user not found", 404);
    res.status(200).json({ message: "success" });
});
exports.updateUser = updateUser;
// soft deleting
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.destroy({ where: { id: req.params.id } });
    if (!user)
        throw new appError_1.AppError("user not found", 404);
    res.status(200).json({ message: "success" });
});
exports.deleteUser = deleteUser;
const restoreUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.findByPk(req.params.id, { paranoid: false });
    if (!user)
        throw new appError_1.AppError("user not found", 404);
    yield user_schema_1.default.restore({ where: { id: req.params.id } });
    res.status(200).json({ message: `user with id ${user.id} restored successfully` });
});
exports.restoreUser = restoreUser;
