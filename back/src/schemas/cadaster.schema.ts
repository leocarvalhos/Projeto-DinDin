import { object, string } from "yup"

export default object({
    name: string().required("O nome é obrigatório!").min(3, "O username deve conter no mínimo três caracteres"),
    email: string().required("O username é obrigatório!").matches(RegExp("^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$"), "Email invalido!"),


    password: string().required("O password é obrigatório!").matches(RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$"), "A senha deve conter pelo menos oito caracteres, uma letra maiúscula, um digíto e um caractere especial!")
})