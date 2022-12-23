import styles from '../../styles/components/EditProfile.module.sass';
import X from '../../../public/images/x.svg';
import Image from 'next/image';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ShowEye from '../../utils/ShowEye';
import useStorage from '../../hooks/useStorage';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import api from '../../api';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
import headers from '../../utils/Token';
import IFormProfile from '../../interfaces/IFormProfile.type';
import schema from '../../schemas/cadaster.schema';
import { yupResolver } from '@hookform/resolvers/yup';
export default function FormEditProfile({ setShowModal }: Props) {
    const notify = () => toast.success('Cadastro atualizado com sucesso!');

    const { user }: any = useStorage();
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [showEyePassword, setShowEyePassword] = useState<boolean>(false);
    const [showEyeCPassword, setShowEyeCPassword] = useState<boolean>(false);
    const [input, setInput] = useState<any>({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    async function getUser() {
        try {
            const { data } = await api.get('/user', headers(user.token));
            setInput({ name: data.user.name, email: data.user.email });
            setValue('name', data.user.name);
            setValue('email', data.user.email);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormProfile>({ resolver: yupResolver(schema) });
    async function handleFormSubmit(data: IFormProfile) {
        try {
            await api.put('/user', input, headers(user.token));
            notify();
            setTimeout(() => {
                setShowModal(false);
                reset();
            }, 1600);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={styles.conteudo}>
            <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
                <Image
                    src={X}
                    alt="x"
                    className={styles.x}
                    priority
                    onClick={() => setShowModal(false)}
                />
                <h1>Editar Perfil</h1>

                <FormControl isInvalid={!!errors.name?.message}>
                    <FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
                    <div style={{ position: 'relative' }}>
                        <Input
                            className={styles.input}
                            type="text"
                            id="1"
                            {...register('name')}
                            value={input.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && (
                            <FormErrorMessage className={styles.errorMessage}>
                                {errors.name?.message}
                            </FormErrorMessage>
                        )}
                    </div>
                </FormControl>
                <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
                    <div style={{ position: 'relative' }}>
                        <Input
                            className={styles.input}
                            type="email"
                            id="2"
                            {...register('email')}
                            value={input.email}
                            onChange={handleInputChange}
                        />
                        {!!errors.email && (
                            <FormErrorMessage className={styles.errorMessage}>
                                {errors.email?.message}
                            </FormErrorMessage>
                        )}
                    </div>
                </FormControl>
                <FormControl isInvalid={!!errors.password?.message}>
                    <FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'relative' }}></div>

                        <Input
                            className={styles.input}
                            type={!showEyePassword ? 'password' : 'text'}
                            id="3"
                            {...register('password')}
                            value={input.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <FormErrorMessage className={styles.errorMessage}>
                                {errors.password?.message}
                            </FormErrorMessage>
                        )}
                        {ShowEye(styles.eyePass, showEyePassword, setShowEyePassword)}
                    </div>
                </FormControl>
                <FormControl isInvalid={!!errors.cpassword?.message}>
                    <FormLabel style={{ fontSize: '1.4rem' }}>
                        Confirmação de senha
                    </FormLabel>
                    <div style={{ position: 'relative' }}>
                        <Input
                            className={styles.input}
                            type={!showEyeCPassword ? 'password' : 'text'}
                            id="4"
                            {...register('cpassword')}
                            value={input.cpassword}
                            onChange={handleInputChange}
                        />
                        {errors.cpassword && (
                            <FormErrorMessage className={styles.errorMessage}>
                                {errors.cpassword?.message}
                            </FormErrorMessage>
                        )}
                        {ShowEye(styles.eyePass, showEyeCPassword, setShowEyeCPassword)}
                    </div>
                </FormControl>
                <Button className={styles.btn} type="submit">
                    Atualizar
                </Button>
                <Toaster position="top-center" reverseOrder={false} />
            </form>
        </div>
    );
}
