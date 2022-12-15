"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRepository = void 0;
const data_source_1 = require("../data-source");
const Transaction_1 = require("../entities/Transaction");
exports.transactionRepository = data_source_1.AppDataSource.getRepository(Transaction_1.Transaction);
