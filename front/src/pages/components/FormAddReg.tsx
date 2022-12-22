import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import CurrencyFormat from 'react-currency-format';
import { yupResolver } from '@hookform/resolvers/yup';
import { set, useForm } from 'react-hook-form';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import X from '../../../public/images/x.svg';
import api from '../../api';
import useStorage from '../../hooks/useStorage';
import { IFormReg } from '../../interfaces/IFormReg.type';
import styles from '../../styles/components/AddReg.module.sass';
import headers from '../../utils/Token';
import schema from '../../schemas/addTransaction.schema';
import toast, { Toaster } from 'react-hot-toast';
interface Category {
    id: number;
    description: string;
}
interface Props {
    setShowAddReg: Dispatch<SetStateAction<boolean>>;
}
export default function FormAddReg({ setShowAddReg }: Props) {
    const notify = () => toast.success('Transação criada com sucesso!');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormReg>({ resolver: yupResolver(schema) });
    const { user }: any = useStorage();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [input, setInput] = useState<IFormReg>({
        value: ' ',
        category_id: '',
        date: new Date(),
        description: '',
        type: 'entrada',
    });

    function handleInputChange(e: any) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    function handlerInputType(e: any) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    async function getCategories() {
        try {
            const response = await api.get('/categories', headers(user.token));
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function createTransaction(data: IFormReg) {
        try {
            if (input.value === '') return setError(true);
            await api.post('/transaction', input, headers(user.token));
            notify();
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className={styles.container}>
            <main>
                <h1>Adicionar Registro</h1>
                <Image
                    src={X}
                    alt="x"
                    className={styles.x}
                    onClick={() => setShowAddReg(false)}
                />
                <form onSubmit={handleSubmit(createTransaction)}>
                    <FormControl isInvalid={error}>
                        <div className={styles.buttons}>
                            <Button
                                style={{
                                    borderRadius: '10px 0px 0px 10px',
                                    backgroundColor: `${
                                        input.type === 'entrada' ? '#3A9FF1' : '#B9B9B9'
                                    }  `,
                                }}
                                onClick={handlerInputType}
                                name="type"
                                value="entrada"
                            >
                                Entrada
                            </Button>
                            <Button
                                style={{
                                    borderRadius: '0px 10px 10px 0px',
                                    backgroundColor: `${
                                        input.type === 'saida' ? '#FF576B' : '#B9B9B9'
                                    }  `,
                                }}
                                onClick={handlerInputType}
                                name="type"
                                value="saida"
                            >
                                Saida
                            </Button>
                        </div>
                    </FormControl>

                    <FormControl isInvalid={error}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Valor</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                as={CurrencyFormat}
                                name="value"
                                prefix={'R$ '}
                                id="field-:rd:"
                                thousandSeparator={'.'}
                                milspacing={true}
                                className={styles.input}
                                decimalSeparator={','}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                onChange={handleInputChange}
                                value={input.value}
                            />
                            {error && (
                                <FormErrorMessage className={styles.errors}>
                                    Todos os camps são obrigatórios
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.category_id?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Categoria</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Select
                                placeholder="Seleciona a categoria"
                                {...register('category_id')}
                                style={{ fontSize: '1.4rem', display: 'flex' }}
                                onChange={handleInputChange}
                            >
                                {categories.map((category: Category) => {
                                    return (
                                        <option key={category.id} value={category.id}>
                                            {category.description}
                                        </option>
                                    );
                                })}
                            </Select>
                            {errors.category_id && (
                                <FormErrorMessage
                                    className={styles.errors}
                                    style={{ bottom: '-15px' }}
                                >
                                    {errors.category_id.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.date?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Data</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                type="date"
                                id="start"
                                {...register('date')}
                                min="2000-01-01"
                                max="3000-12-31"
                                onChange={handleInputChange}
                                placeholder="Ex: 01/01/2023"
                            />
                            {errors.date && (
                                <FormErrorMessage className={styles.errors}>
                                    {errors.date.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.description?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Descrição</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type="text"
                                {...register('description')}
                                onChange={handleInputChange}
                                placeholder="Canetas"
                            />
                            {errors.description && (
                                <FormErrorMessage className={styles.errors}>
                                    {errors.description.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <Button className={styles.btn} type="submit">
                        Confirmar
                    </Button>
                    <Toaster position="top-center" reverseOrder={false} />
                </form>
            </main>
        </div>
    );
}
