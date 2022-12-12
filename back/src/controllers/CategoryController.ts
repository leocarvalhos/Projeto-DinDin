import { Request, Response } from "express"
import { categoryRepository } from '../repositories/categoryRepository'

export class CategoryController {

    async categories(req: Request, res: Response) {
        try {
            const categories = await categoryRepository
                .createQueryBuilder("categories").getRawMany()

            return res.status(200).json(categories)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}