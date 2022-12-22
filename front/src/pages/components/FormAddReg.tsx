import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import X from '../../../public/images/x.svg';
import api from '../../api';
import useStorage from '../../hooks/useStorage';
import { IFormReg } from '../../interfaces/IFormReg.type';
import schema from '../../schemas/addTransaction.schema';
import styles from '../../styles/components/AddReg.module.sass';
import headers from '../../utils/Token';
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
        setValue,
        formState: { errors },
        reset,
    } = useForm<IFormReg>({ resolver: yupResolver(schema) });

    const { user }: any = useStorage();
    const [categories, setCategories] = useState([]);
    const [input, setInput] = useState<IFormReg>({
        value: 0,
        category_id: '',
        date: new Date(),
        description: '',
        type: 'entrada',
    });

    function handleInputValueChange(values: any) {
        const numberValue: number = isNaN(values.floatValue)
            ? undefined
            : values.floatValue;
        setInput({ ...input, value: numberValue });
        setValue('value', numberValue);
    }
    function handleInputChange(e: any) {
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
    console.log(input);
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
                    <FormControl>
                        <div className={styles.buttons}>
                            <Button
                                style={{
                                    borderRadius: '10px 0px 0px 10px',
                                    backgroundColor: `${
                                        input.type === 'entrada' ? '#3A9FF1' : '#B9B9B9'
                                    }  `,
                                }}
                                onClick={handleInputChange}
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
                                onClick={handleInputChange}
                                name="type"
                                value="saida"
                            >
                                Saida
                            </Button>
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.value?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Valor</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                value={input.value}
                                {...register('value')}
                                as={CurrencyFormat}
                                prefix={'R$ '}
                                id="field-:rd:"
                                thousandSeparator={'.'}
                                className={styles.input}
                                decimalSeparator={','}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                onValueChange={handleInputValueChange}
                            />
                            {errors.value && (
                                <FormErrorMessage className={styles.errors}>
                                    {errors.value.message}
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
                                    style={{ bottom: '-18px' }}
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
