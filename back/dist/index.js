"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require('dotenv').config();
require("express-async-errors");
var data_source_1 = require("./data-source");
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
data_source_1.AppDataSource.initialize().then(function () {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(routes_1.default);
    console.log("Express server has started on port ".concat(process.env.PORT));
    return app.listen(process.env.PORT);
}).catch(function (error) { return console.log(error); });
