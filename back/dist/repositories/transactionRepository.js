"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRepository = void 0;
var data_source_1 = require("../data-source");
var Transaction_1 = require("../entities/Transaction");
exports.transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
