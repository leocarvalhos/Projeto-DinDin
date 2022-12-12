import { Request, Response } from "express"
import moment from 'moment'
import { userInfo } from 'os'
import { Any, ILike } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities/Category'
import { Transaction } from '../entities/Transaction'
import { User } from '../entities/User'
import { categoryRepository } from '../repositories/categoryRepository'
import { transactionRepository } from '../repositories/transactionRepository'

function formatValue(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function formatDate(date: string) {
    return moment(date, "DD/MM/YYYY").format()
}

export class TransactionController {
    async createTransaction(req: Request, res: Response) {
        const { description, value, date, category_id, type } = req.body
        const { id }: any = req.user

        if (!description || !value || !type || !date || !category_id) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." })
        }

        if (type !== 'entrada' && type !== 'saida') return res.status(400).json({ message: "Apenas entrada e saída são tipos validos!" })

        try {
            const response = await transactionRepository.create({
                description,
                value,
                date: formatDate(date),
                category: category_id,
                user: id,
                type,
            })
            transactionRepository.save(response)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async listTransactions(req: Request, res: Response) {
        const { id }: any = req.user

        const { filter }: any = req.query
        try {
            if (filter) {
                const response = await transactionRepository.find({
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
                            description: Any(filter)
                        }
                    },
                })
                return res.status(200).json(response)

            } else {
                const response = await transactionRepository.find({
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
                })
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async transactionId(req: Request, res: Response) {
        const { id: idUser } = req.user
        const { id }: any = req.params
        console.log(idUser, id)

        try {
            const response = await transactionRepository.find({
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

            })
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async updateTransaction(req: Request, res: Response) {
        const { description, value, type, date, category_id } = req.body
        const { id }: any = req.params
        const { id: idUser }: any = req.user

        try {
            if (!description && !value && !type && !date && !category_id) {
                return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." })
            }

            await transactionRepository.update({ id, user: idUser }, {
                description,
                value,
                date: formatDate(date),
                type,
                category: category_id,
            })

            return res.status(204).json()
        } catch (error) {
            return res.json(error)
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        const { id }: any = req.params
        const { id: idUser }: any = req.user
        try {
            await transactionRepository.createQueryBuilder()
                .delete()
                .from(Transaction)
                .where({
                    id,
                    user_id: idUser
                })
                .execute()

            return res.status(204).json()
        } catch (error) {
            return res.json(error)
        }

    }

    async extract(req: Request, res: Response) {
        const { id }: any = req.user

        try {

            const { profit } = await transactionRepository.createQueryBuilder("transactions")
                .select("SUM(transactions.value) as profit")
                .where("transactions.user = :id", { id })
                .andWhere("transactions.type = :type", { type: 'entrada' })
                .getRawOne()

            const { expenses } = await transactionRepository.createQueryBuilder("transactions")
                .select("SUM(transactions.value) as expenses")
                .where("transactions.user = :id", { id })
                .andWhere("transactions.type = :type", { type: 'saida' })
                .getRawOne()

            const balance = Number(profit) - Number(expenses)

            return res.status(200).json({ profit, expenses, balance })
        } catch (error) {

            return res.json(error)
        }

    }

}

