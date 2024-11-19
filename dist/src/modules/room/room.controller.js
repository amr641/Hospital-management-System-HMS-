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
exports.restoreRoom = exports.getAllRooms = exports.getRoom = exports.deleteRoom = exports.updateRoom = exports.addRoom = void 0;
const room_schema_1 = __importDefault(require("../../../config/schemas/room.schema"));
const appError_1 = require("../../utils/appError");
// add a new room
const addRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.create(req.body);
    res.status(200).json({ message: "success", room });
});
exports.addRoom = addRoom;
// update room
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.findByPk(req.params.id);
    if (!room)
        throw new appError_1.AppError(`Room:${req.params.id} does nor exist`, 404); // if not exist
    yield room_schema_1.default.update(req.body, { where: { id: room.id } }); // update if exist
    res.status(200).json({ message: "success" }); //return the response
});
exports.updateRoom = updateRoom;
// delete room
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.findByPk(req.params.id);
    if (!room)
        throw new appError_1.AppError(`Room:${req.params.id} does nor exist`, 404); // if not exist
    yield room.destroy(); // delete if exist
    res.status(200).json({ message: "success" }); //return the response
});
exports.deleteRoom = deleteRoom;
// get room
const getRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.findByPk(req.params.id);
    if (!room)
        throw new appError_1.AppError(`Room:${req.params.id} does nor exist`, 404);
    res.status(200).json({ message: "success", room });
});
exports.getRoom = getRoom;
// get all rooms or get all rooms with department
const getAllRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let department = req.query.department;
    let rooms = yield room_schema_1.default.findAll({ where: department ? { department } : undefined });
    if (!rooms.length)
        throw new appError_1.AppError(`Room:${req.params.id} does nor exist`, 404);
    res.status(200).json({ message: "success", rooms });
});
exports.getAllRooms = getAllRooms;
const restoreRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let room = yield room_schema_1.default.findByPk(req.params.id, { paranoid: false });
    if (!room)
        throw new appError_1.AppError("patient not found", 404);
    yield room.restore();
    res.status(200).json({ message: `room with id ${room.id} restored successfully` });
});
exports.restoreRoom = restoreRoom;
