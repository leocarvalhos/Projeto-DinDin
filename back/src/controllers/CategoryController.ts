import { Request, Response } from "express"
import { categoryRepository } from '../repositories/categoryRepository'

export class CategoryController {

    async categorys(req: Request, res: Response) {
        try {
            const categorys = await categoryRepository
                .createQueryBuilder("categorys").getRawMany()

            return res.status(200).json(categorys)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}