"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    name: (0, yup_1.string)().required("O nome é obrigatório!").min(3, "O username deve conter no mínimo três caracteres"),
    email: (0, yup_1.string)().required("O username é obrigatório!").matches(RegExp("^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"), "Email invalido!"),
    password: (0, yup_1.string)().required("O password é obrigatório!").matches(RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$"), "A senha deve conter pelo menos oito caracteres, uma letra maiúscula, um digíto e um caractere especial!")
});
