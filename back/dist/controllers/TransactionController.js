"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const Transaction_1 = require("../entities/Transaction");
const transactionRepository_1 = require("../repositories/transactionRepository");
function formatValue(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function formatDate(date) {
    return (0, moment_1.default)(date, "DD/MM/YYYY").format();
}
class TransactionController {
    async createTransaction(req, res) {
        const { description, value, date, category_id, type } = req.body;
        const { id } = req.user;
        if (!description || !value || !type || !date || !category_id) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." });
        }
        if (type !== 'entrada' && type !== 'saida')
            return res.status(400).json({ message: "Apenas entrada e saída são tipos validos!" });
        try {
            const response = await transactionRepository_1.transactionRepository.create({
                description,
                value,
                date: formatDate(date),
                category: category_id,
                user: id,
                type,
            });
            transactionRepository_1.transactionRepository.save(response);
            return res.status(201).json(response);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async listTransactions(req, res) {
        const { id } = req.user;
        const { filter } = req.query;
        try {
            if (filter) {
                const response = await transactionRepository_1.transactionRepository.find({
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
                            id
                        },
                        category: {
                            description: (0, typeorm_1.Any)(filter)
                        }
                    },
                });
                return res.status(200).json(response);
            }
            else {
                const response = await transactionRepository_1.transactionRepository.find({
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
                            id,
                        }
                    }
                });
                return res.status(200).json(response);
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async transactionId(req, res) {
        const { id: idUser } = req.user;
        const { id } = req.params;
        console.log(idUser, id);
        try {
            const response = await transactionRepository_1.transactionRepository.find({
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
            });
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async updateTransaction(req, res) {
        const { description, value, type, date, category_id } = req.body;
        const { id } = req.params;
        const { id: idUser } = req.user;
        try {
            if (!description && !value && !type && !date && !category_id) {
                return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." });
            }
            await transactionRepository_1.transactionRepository.update({ id, user: idUser }, {
                description,
                value,
                date: formatDate(date),
                type,
                category: category_id,
            });
            return res.status(204).json();
        }
        catch (error) {
            return res.json(error);
        }
    }
    async deleteTransaction(req, res) {
        const { id } = req.params;
        const { id: idUser } = req.user;
        try {
            await transactionRepository_1.transactionRepository.createQueryBuilder()
                .delete()
                .from(Transaction_1.Transaction)
                .where({
                id,
                user_id: idUser
            })
                .execute();
            return res.status(204).json();
        }
        catch (error) {
            return res.json(error);
        }
    }
    async extract(req, res) {
        const { id } = req.user;
        try {
            const { profit } = await transactionRepository_1.transactionRepository.createQueryBuilder("transactions")
                .select("SUM(transactions.value) as profit")
                .where("transactions.user = :id", { id })
                .andWhere("transactions.type = :type", { type: 'entrada' })
                .getRawOne();
            const { expenses } = await transactionRepository_1.transactionRepository.createQueryBuilder("transactions")
                .select("SUM(transactions.value) as expenses")
                .where("transactions.user = :id", { id })
                .andWhere("transactions.type = :type", { type: 'saida' })
                .getRawOne();
            const balance = Number(profit) - Number(expenses);
            return res.status(200).json({ profit, expenses, balance });
        }
        catch (error) {
            return res.json(error);
        }
    }
}
exports.TransactionController = TransactionController;
