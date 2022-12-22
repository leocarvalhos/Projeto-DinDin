import * as yup from 'yup';
const schema = yup.object().shape({
    value: yup.string().required('Todos os campos são obrigatórios'),
    category_id: yup.string().required('Todos os campos são obrigatórios'),
    date: yup.string().required('Todos os campos são obrigatórios'),
    description: yup.string().required('Todos os campos são obrigatórios')
})
export default schema
