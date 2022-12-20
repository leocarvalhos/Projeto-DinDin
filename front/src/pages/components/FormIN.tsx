import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../../public/images/logoViolet.svg';
import api from '../../api';
import useStorage from '../../hooks/useStorage';
import IForm from '../../interfaces/IForm.type';
import schema from '../../schemas/login.schema';
import styles from '../../styles/components/FormIN.module.sass';
import ShowEye from '../../utils/ShowEye';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
export default function FormIN() {
    const router = useRouter();
    const notify = () => toast.success('Bem vindo(a) ao DinDin!');
    const { setUser }: any = useStorage();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [input, setInput] = useState<IForm>({
        email: '',
        password: '',
    });

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    async function onSubmithanlder(data: IForm) {
        try {
            const response = await api.post('/login', input);
            setUser(response.data.user);
            notify();
            reset();
            setTimeout(() => {
                router.push('/home');
            }, 1500);
        } catch (error) {
            console.log(error);
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
                <form onSubmit={handleSubmit(onSubmithanlder)}>
                    <FormControl isInvalid={!!errors?.email?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type="email"
                                {...register('email')}
                                value={input.email}
                                onChange={handleInputChange}
                            />
                            {errors && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>
                    <FormControl isInvalid={!!errors?.password?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type={!showPassword ? 'password' : 'text'}
                                {...register('password')}
                                value={input.password}
                                onChange={handleInputChange}
                            />
                            {errors && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            )}
                            {ShowEye(styles.eye, showPassword, setShowPassword)}
                        </div>
                    </FormControl>
                    <Button className={styles.btn} type="submit">
                        Entrar
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
