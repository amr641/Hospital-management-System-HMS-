"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const bootstrab_1 = require("./src/modules/bootstrab");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
dbConnection_1.sequelize.sync();
(0, bootstrab_1.bootstrab)(app);
app.listen(port, () => console.log(`server listening on port ${port}!`));
