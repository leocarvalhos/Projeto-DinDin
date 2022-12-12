"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    async cadaster(req, res) {
        const { name, email, password } = req.body;
        try {
            const validation = await userRepository_1.userRepository.findOneBy({ email });
            if (validation)
                return res.status(400).json({ message: "E-mail já cadastrado!" });
            const passwordCrypted = await bcrypt_1.default.hash(password, 10);
            const data = {
                name,
                email,
                password: passwordCrypted,
            };
            const user = await userRepository_1.userRepository.create(data);
            await userRepository_1.userRepository.save(user);
            return res.status(201).json({ user });
        }
        catch (e) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        try {
            const user = await userRepository_1.userRepository.findOneBy({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." });
            }
            const conferencePassword = await bcrypt_1.default.compare(password, user.password);
            if (!conferencePassword) {
                return res.status(404).json({ message: "Usuário e/ou senha inválido(s)." });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
                expiresIn: '8h'
            });
            const { password: _, ...userLogin } = user;
            return res.status(201).json({
                user: { ...userLogin, token }
            });
        }
        catch (e) {
            return res.status(500).json(e);
        }
    }
    async user(req, res) {
        try {
            return res.status(200).json({ user: req.user });
        }
        catch (error) {
        }
    }
    async updateUser(req, res) {
        const { name, email, password } = req.body;
        const { id, email: currentEmail } = req.user;
        try {
            if (email !== currentEmail) {
                console.log('entrei');
                const user = await userRepository_1.userRepository.findOneBy({ email });
                if (user) {
                    return res.status(400).json({ message: "O e-mail informado já está sendo utilizado por outro usuário." });
                }
            }
            const passwordCrypted = await bcrypt_1.default.hash(password, 10);
            await userRepository_1.userRepository.createQueryBuilder()
                .update(User_1.User)
                .set({ name, email, password: passwordCrypted })
                .where("id = :id", { id }).execute();
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
exports.UserController = UserController;
