import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup'


export default function validateSchema(schema: AnyObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validate(req.body)
            next()
        } catch (error: any) {
            return res.status(500).json(error.errors[0])
        }
    }
}