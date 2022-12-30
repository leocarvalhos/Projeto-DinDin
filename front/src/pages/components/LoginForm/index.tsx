import {
    Button,
    CircularProgress,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Logo from '../../../../public/images/logoViolet.svg';
import api from '../../../api';
import useStorage from '../../../hooks/useStorage';
import IForm from '../../../interfaces/IForm.type';
import schema from '../../../schemas/login.schema';
import styles from './styles.module.sass';

import IStorage from '../../../interfaces/IStorage.type';
import ShowEye from '../../../utils/ShowEye';

export default function FormIN() {
    const router = useRouter();
    const { setUser }: IStorage = useStorage();
    const notify = () => toast.success('Bem vindo(a) ao DinDin!');
    const [btnLogin, setBtnLogin] = useState<boolean>(false);
    const [errorBack, setErrorBack] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    async function onSubmit(data: IForm) {
        try {
            setBtnLogin(true);
            const response = await api.post('/login', data);
            setUser!(response.data.user);
            notify();
            reset();
            setTimeout(() => {
                router.push('/home');
            }, 1500);
        } catch (error: any) {
            setBtnLogin(false);
            console.log(error);
            if (error.response?.data?.message) {
                setErrorBack(error.response.data.message);
            }
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>({ resolver: yupResolver(schema) });
    return (
        <main className={styles.main}>
            <section>
                <Image priority src={Logo} alt="Logo" className={styles.logo} />
                <h2>Conecte-se</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors?.email?.message || !!errorBack}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type="email"
                                {...register('email')}
                            />
                            {errors && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>
                    <FormControl isInvalid={!!errors?.password?.message || !!errorBack}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type={!showPassword ? 'password' : 'text'}
                                {...register('password')}
                            />
                            {errors && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            )}
                            {errorBack && (
                                <span className={styles.errorMessage}>{errorBack}</span>
                            )}
                            {ShowEye(styles.eye, showPassword, setShowPassword)}
                        </div>
                    </FormControl>
                    <Button className={styles.btn} type="submit">
                        {!btnLogin ? (
                            'Entrar'
                        ) : (
                            <CircularProgress
                                isIndeterminate
                                color="green.300"
                                size="35px"
                            />
                        )}
                    </Button>
                    <Link href={'/sign-up'}>
                        <Button className={styles.btnRegister}>Cadastre-se</Button>
                    </Link>
                    <Toaster position="top-center" reverseOrder={false} />
                </form>
            </section>
        </main>
    );
}
