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
exports.deleteItem = exports.updateItem = exports.getItem = exports.getAllItems = exports.addItem = void 0;
const inventory_schema_1 = __importDefault(require("../../../config/schemas/inventory.schema"));
const appError_1 = require("../../utils/appError");
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.handled_by = (_a = req.user) === null || _a === void 0 ? void 0 : _a.SSN;
    let item = yield inventory_schema_1.default.create(req.body);
    res.status(201).json({ messsage: "success", item });
});
exports.addItem = addItem;
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let items = yield inventory_schema_1.default.findAll();
    if (!items.length)
        throw new appError_1.AppError("no items found", 404);
    res.status(201).json({ messsage: "success", items });
});
exports.getAllItems = getAllItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let item = yield inventory_schema_1.default.findByPk(req.params.id);
    if (!item)
        throw new appError_1.AppError("item not found", 404);
    res.status(200).json({ message: "success", item });
});
exports.getItem = getItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    const [affectedRows, [updatedItem]] = yield inventory_schema_1.default.update(req.body, {
        where: { id },
        returning: true,
    });
    if (!affectedRows)
        throw new appError_1.AppError("item not found", 404);
    res.status(200).json({ message: "success", data: updatedItem });
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find the item
    const item = yield inventory_schema_1.default.findByPk(req.params.id);
    if (!item)
        throw new appError_1.AppError("item not found", 404);
    // destoy it
    yield inventory_schema_1.default.destroy({ where: { id: item.id } });
    res.status(200).json({ message: "success", item });
});
exports.deleteItem = deleteItem;
