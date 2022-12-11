import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        await schema.validate(req.body)
        next()
    } catch (error: any) {
        return res.status(400).send(error.message)
    }

}

export default validate;