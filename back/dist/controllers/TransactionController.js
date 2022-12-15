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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
var moment_1 = __importDefault(require("moment"));
var typeorm_1 = require("typeorm");
var transactionRepository_1 = require("../repositories/transactionRepository");
function formatDate(date) {
    return (0, moment_1.default)(date, "DD/MM/YYYY").format();
}
var TransactionController = /** @class */ (function () {
    function TransactionController() {
    }
    TransactionController.prototype.createTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, value, date, category_id, type, id, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, description = _a.description, value = _a.value, date = _a.date, category_id = _a.category_id, type = _a.type;
                        id = req.user.id;
                        if (!description || !value || !type || !date || !category_id) {
                            return [2 /*return*/, res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." })];
                        }
                        if (type !== 'entrada' && type !== 'saida')
                            return [2 /*return*/, res.status(400).json({ message: "Apenas entrada e saída são tipos validos!" })];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.insert({
                                description: description,
                                value: value,
                                date: formatDate(date),
                                category: category_id,
                                user: id,
                                type: type,
                            })];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, res.status(201).json(response)];
                    case 3:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.listTransactions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, filter, response, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.user.id;
                        filter = req.query.filter;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!filter) return [3 /*break*/, 3];
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.find({
                                select: {
                                    user: {
                                        id: true
                                    }
                                },
                                relations: {
                                    category: true,
                                    user: true
                                },
                                where: {
                                    user: {
                                        id: id
                                    },
                                    category: {
                                        description: (0, typeorm_1.Any)(filter)
                                    }
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, res.status(200).json(response)];
                    case 3: return [4 /*yield*/, transactionRepository_1.transactionRepository.find({
                            select: {
                                user: {
                                    id: true
                                }
                            },
                            relations: {
                                category: true,
                                user: true
                            },
                            where: {
                                user: {
                                    id: id,
                                }
                            }
                        })];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, res.status(200).json(response)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_2)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.transactionId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUser, id, response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUser = req.user.id;
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.find({
                                select: {
                                    user: {
                                        id: true
                                    }
                                },
                                where: {
                                    user: {
                                        id: idUser
                                    },
                                    id: id
                                },
                                relations: {
                                    category: true,
                                    user: true
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, res.status(200).json(response)];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.updateTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, value, type, date, category_id, id, idUser, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, description = _a.description, value = _a.value, type = _a.type, date = _a.date, category_id = _a.category_id;
                        id = req.params.id;
                        idUser = req.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (!description && !value && !type && !date && !category_id) {
                            return [2 /*return*/, res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." })];
                        }
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.update({ id: id, user: idUser }, {
                                description: description,
                                value: value,
                                date: formatDate(date),
                                type: type,
                                category: category_id,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(204).json()];
                    case 3:
                        e_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json(e_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.deleteTransaction = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, idUser, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        idUser = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.delete({
                                id: id,
                                user: {
                                    id: idUser
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(204).json()];
                    case 3:
                        e_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_5)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.extract = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, profit, expenses, balance, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.createQueryBuilder("transactions")
                                .select("SUM(transactions.value) as profit")
                                .where("transactions.user = :id", { id: id })
                                .andWhere("transactions.type = :type", { type: 'entrada' })
                                .getRawOne()];
                    case 2:
                        profit = (_a.sent()).profit;
                        return [4 /*yield*/, transactionRepository_1.transactionRepository.createQueryBuilder("transactions")
                                .select("SUM(transactions.value) as expenses")
                                .where("transactions.user = :id", { id: id })
                                .andWhere("transactions.type = :type", { type: 'saida' })
                                .getRawOne()];
                    case 3:
                        expenses = (_a.sent()).expenses;
                        balance = Number(profit) - Number(expenses);
                        return [2 /*return*/, res.status(200).json({ profit: profit, expenses: expenses, balance: balance })];
                    case 4:
                        e_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json(e_6)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TransactionController;
}());
exports.TransactionController = TransactionController;
