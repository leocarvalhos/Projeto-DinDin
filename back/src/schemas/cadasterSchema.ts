import * as yup from 'yup';

const cadasterSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório.'),
    email: yup.string().required('Email obrigatório.').email(),
    password: yup.string().required('Senha obrigatória.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, "A senha deve conter ao menos um dígito, uma letra maiúscula, um caractere especial e oito dígitos;")
})
export default cadasterSchema