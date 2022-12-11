import { Request, Response } from "express"
import moment from 'moment'
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
                category_id: category_id,
                user_id: id,
                type,
            })

            transactionRepository.save(response)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async listTransactions(req: Request, res: Response) {
        const { id }: any = req.user.id
        const value: number | string | null | undefined | Array<any> | object | Partial<User> = 1
        const { filter }: any = req.query
        try {
            if (filter) {
                const response = await transactionRepository.find({
                    relations: {
                        category_id: true,

                    },
                    // where: {
                    //     user_id: id,
                    //     category_id: {
                    //         description: Any(filter)
                    //     }
                    // },
                })
                return res.status(200).json(response)
            } else {
                const response = await transactionRepository.find({

                    where: {
                        user_id: id
                    }


                })
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async transactionId(req: Request, res: Response) {

        const { id: idUser }: any = req.user
        const { id }: any = req.params


        try {
            const response = await transactionRepository.find({
                where: {
                    user_id: idUser,
                    id
                },
                relations: {
                    category_id: true,
                },
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

            await transactionRepository.update({ id, user_id: idUser }, {
                description,
                value,
                date: formatDate(date),
                type,
                category_id: category_id,
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
            // const profit = await transactionRepository.query(`SELECT SUM(transactions.value) as value_profit FROM transactions WHERE transactions.user_id = $1 AND transactions.type = $2`, [id, 'entrada'])

            // const expenses = await transactionRepository.query(`SELECT SUM(transactions.value) as value_expenses FROM transactions WHERE transactions.user_id = $1 AND transactions.type = $2`, [id, 'saida'])

            // const balance = Number(profit[0].value_profit) - Number(expenses[0].value_expenses)
            // const value_profit = profit[0].value_profit
            // const value_expenses = expenses[0].value_expenses

            // return res.status(200).json({ balance, value_profit, value_expenses })
        } catch (error) {
            console.log(error)
            return res.json(error)
        }

    }

}

