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
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import X from '../../../../public/images/x.svg';
import api from '../../../api';
import useStorage from '../../../hooks/useStorage';
import ICategory from '../../../interfaces/ICategory.type';
import { IFormReg } from '../../../interfaces/IFormReg.type';
import IStorage from '../../../interfaces/IStorage.type';
import ITransactions from '../../../interfaces/ITransactions.type';
import schema from '../../../schemas/addTransaction.schema';
import headers from '../../../utils/Token';
import styles from './styles.module.sass';
interface Props {
    categories: ICategory[];
    getTransactions(): Promise<void>;
    setModalEditTransaction: Dispatch<SetStateAction<boolean>>;
    transactions: any;
    getOneTransaction: ITransactions | undefined;
}
export default function UpdateTransaction({
    categories,
    getTransactions,
    setModalEditTransaction,
    transactions,
    getOneTransaction,
}: Props) {
    const notify = () => toast.success('Transação atualizada com sucesso!');
    const { user }: IStorage = useStorage();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<IFormReg>({ resolver: yupResolver(schema) });

    const [input, setInput] = useState<IFormReg>({
        value: Number(getOneTransaction?.value),
        category_id: Number(getOneTransaction?.category.id),
        date: new Date(),
        description: getOneTransaction?.description,
        type: getOneTransaction?.type,
    });

    function handleInputValueChange(values: any) {
        const numberValue: number = isNaN(values?.floatValue)
            ? undefined
            : values.floatValue;
        setInput({ ...input, value: numberValue });
        setValue('value', numberValue);
    }

    function handleInputsForm(
        e:
            | ChangeEvent<HTMLInputElement | HTMLSelectElement>
            | MouseEvent<HTMLButtonElement>
    ) {
        setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    }

    async function handleUpdate() {
        try {
            await api.put(
                `/transaction/${getOneTransaction?.id}`,
                input,
                headers(user?.token)
            );
            notify();
            document.body.classList.remove('overflow-hidden');
            setTimeout(() => {
                setModalEditTransaction(false);
            }, 1200);
            getTransactions();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className={styles.container}>
            <section>
                <h1>Editar Registro</h1>
                <Image
                    src={X}
                    alt="x"
                    className={styles.x}
                    onClick={() => {
                        document.body.classList.remove('overflow-hidden');
                        setModalEditTransaction(false);
                    }}
                />
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <FormControl>
                        <div className={styles.buttons}>
                            <Button
                                style={{
                                    borderRadius: '10px 0px 0px 10px',
                                    backgroundColor: `${
                                        input.type === 'entrada' ? '#3A9FF1' : '#B9B9B9'
                                    }  `,
                                }}
                                onClick={handleInputsForm}
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
                                onClick={handleInputsForm}
                                name="type"
                                value="saida"
                            >
                                Saida
                            </Button>
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.value?.message}>
                        <FormLabel className={styles.label}>Valor</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                value={input.value}
                                {...register('value')}
                                as={CurrencyFormat}
                                allowNegative={false}
                                prefix={'R$ '}
                                id="field-:rd:"
                                thousandSeparator={'.'}
                                className={styles.input}
                                decimalSeparator={','}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                onValueChange={handleInputValueChange}
                                placeholder="Ex: R$ 400,00"
                            />
                            {errors.value && (
                                <FormErrorMessage className={styles.errors}>
                                    {errors.value.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.category_id?.message}>
                        <FormLabel className={styles.label}>Categoria</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Select
                                placeholder="Seleciona a categoria"
                                {...register('category_id')}
                                value={input.category_id}
                                style={{ fontSize: '1.4rem', display: 'flex' }}
                                onChange={handleInputsForm}
                            >
                                {categories?.map((category: ICategory) => {
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
                        <FormLabel className={styles.label}>Data</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                type="date"
                                id="start"
                                {...register('date')}
                                min="2000-01-01"
                                max="3000-12-31"
                                onChange={handleInputsForm}
                            />
                            {errors.date && (
                                <FormErrorMessage className={styles.errors}>
                                    {errors.date.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.description?.message}>
                        <FormLabel className={styles.label}>Descrição</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type="text"
                                {...register('description')}
                                onChange={handleInputsForm}
                                placeholder="Ex: Material escolar"
                                value={input.description}
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
            </section>
        </main>
    );
}
