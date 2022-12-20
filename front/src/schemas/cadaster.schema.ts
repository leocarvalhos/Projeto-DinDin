import * as yup from 'yup';
const schema = yup.object().shape({
    name: yup.string().required('Nome obrigatório.'),
    email: yup.string().required('Email obrigatório.').email(),
    password: yup.string().required('Senha obrigatória.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, "A senha deve conter ao menos um dígito, uma letra maiúscula, um caractere especial e oito dígitos;"),
    cpassword: yup.string().required('Confirmação de senha obrigatória.').oneOf([yup.ref('password')], 'As senhas precisam ser iguais.')
})
export default schema