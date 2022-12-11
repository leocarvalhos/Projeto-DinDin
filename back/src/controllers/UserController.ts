import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from '../entities/User'
import IUser from '../interfaces/cadasterUser.type'
import { userRepository } from '../repositories/userRepository'


export class UserController {
    async cadaster(req: Request, res: Response) {
        const { name, email, password } = req.body
        try {
            const validation = await userRepository.findOneBy({ email })
            if (validation) return res.status(400).json({ message: "E-mail já cadastrado!" })

            const passwordCrypted = await bcrypt.hash(password, 10)

            const data: IUser = {
                name,
                email,
                password: passwordCrypted,
            }

            const user = await userRepository.create(data)
            await userRepository.save(user)

            return res.status(201).json({ user })

        } catch (e: any) {
            return res.status(500).json({ message: "Erro interno no servidor" })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const user = await userRepository.findOneBy({ email })
            if (!user) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })
            }

            const conferencePassword = await bcrypt.compare(password, user.password)
            if (!conferencePassword) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })
            }


            const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
                expiresIn: '8h'
            });

            const { password: _, ...userLogin } = user


            return res.status(201).json({
                user: { ...userLogin, token }
            })

        } catch (e: any) {

            return res.status(500).json(e)

        }
    }

    async user(req: Request, res: Response) {

        try {
            return res.status(200).json({ user: req.user })
        } catch (error) {

        }


    }

    async updateUser(req: Request, res: Response) {
        const { name, email, password } = req.body
        const { id, email: currentEmail } = req.user

        try {
            if (email !== currentEmail) {
                console.log('entrei')
                const user = await userRepository.findOneBy({ email })
                if (user) {
                    return res.status(400).json({ message: "O e-mail informado já está sendo utilizado por outro usuário." })
                }
            }

            const passwordCrypted = await bcrypt.hash(password, 10)


            await userRepository.createQueryBuilder()
                .update(User)
                .set({ name, email, password: passwordCrypted })
                .where("id = :id", { id }).execute()

            return res.status(204).json()

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}