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
exports.allowedTo = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const user_schema_1 = __importDefault(require("../../config/schemas/user.schema"));
// user signing up
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist or not
    let user = yield user_schema_1.default.findOne({ where: { SSN: req.body.SSN } });
    if (user)
        // if user exist
        throw new appError_1.AppError("user already exist please login", 403);
    // ---------------------------*******----------------------------------
    let userData = Object.assign(Object.assign({}, req.body), { 
        // hash the password
        password: bcrypt_1.default.hashSync(req.body.password, 10) });
    // add this user
    user = yield user_schema_1.default.create(userData);
    // generate the the jwt token with one hour expire date
    let token = jsonwebtoken_1.default.sign({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, process.env.JWT_KEY || "secret", { expiresIn: "1h" });
    // send the success response
    res.status(201).json({ message: "success", token });
});
exports.signUp = signUp;
// login 
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_schema_1.default.findOne({ where: { SSN: req.body.SSN } });
    // i used compare instead of comapareSync to avoid blocking the eventloop
    let passwordMatched = bcrypt_1.default.compare(req.body.password, user.password).then((result) => {
        return result;
    });
    if (!user || !passwordMatched)
        throw new appError_1.AppError("incorrect email or password", 403);
    // sign a token
    let token = jsonwebtoken_1.default.sign({ userId: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_KEY || "secret");
    res
        .status(201)
        .json({ message: `welcome back ${user.name}`, token });
});
exports.login = login;
// authorization function 🛑🤚
const allowedTo = function (...roles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log((roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)));
        if (!roles.includes((_b = req.user) === null || _b === void 0 ? void 0 : _b.role))
            throw new appError_1.AppError('you are not authorized', 401);
        next();
    });
};
exports.allowedTo = allowedTo;
