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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const user_schema_1 = __importDefault(require("../../config/schemas/user.schema"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return next(new appError_1.AppError('No token provided', 401));
    }
    const decoded = yield new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'secret', (err, decoded) => {
            if (err) {
                reject(new appError_1.AppError('Invalid token', 401));
            }
            resolve(decoded);
        });
    });
    const user = yield user_schema_1.default.findByPk(decoded.userId);
    if (!user) {
        return next(new appError_1.AppError('User not found', 404));
    }
    req.user = decoded;
    next();
});
exports.verifyToken = verifyToken;
