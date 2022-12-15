"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    const token = authorization.split(" ")[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS || '');
        const user = await userRepository_1.userRepository.findOneBy({ id });
        if (!user)
            return res.status(401).json({ message: "Usuário não autorizado" });
        const { password: _, ...loggedUser } = user;
        req.user = loggedUser;
        next();
    }
    catch (error) {
    }
}
exports.default = authMiddleware;
