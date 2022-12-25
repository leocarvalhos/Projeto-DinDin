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
import LogoDefault from '../../../../public/images/logo.svg';
import LogoViolet from '../../../../public/images/logoViolet.svg';
import api from '../../../api';
import IFormUP from '../../../interfaces/IFormUP.type';
import schema from '../../../schemas/cadaster.schema';
import ShowEye from '../../../utils/ShowEye';
import styles from './styles.module.sass';

export default function FormUP() {
    const notify = () => toast.success('Cadastro bem sucedido!');
    const router = useRouter();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState<boolean>(false);
    const [btnCadaster, setBtnCadaster] = useState<boolean>(false);
    const [input, setInput] = useState<IFormUP>({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormUP>({ resolver: yupResolver(schema) });

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    async function handleForm(data: IFormUP) {
        try {
            setBtnCadaster(true);
            await api.post('/users', input);
            notify();
            setTimeout(() => {
                router.push('/');
                reset();
            }, 2200);
        } catch (error: any) {
            setBtnCadaster(false);
            console.log(error);
            if (error.response.data.message) setError(error.response.data.message);
        }
    }

    return (
        <main className={styles.main}>
            <section>
                <h2>Cadastre-se</h2>

                <Image priority src={LogoViolet} className={styles.logo} alt="logo" />
                <Image
                    priority
                    src={LogoDefault}
                    className={styles.logoDefault}
                    alt="logo"
                />

                <form onSubmit={handleSubmit(handleForm)}>
                    <FormControl isInvalid={!!errors?.name?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                placeholder="Ex: Maria"
                                type="text"
                                {...register('name')}
                                value={input.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.name.message}
                                </FormErrorMessage>
                            )}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.email?.message || !!error}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
                        <Input
                            className={styles.input}
                            type="email"
                            placeholder="Ex: maria@hotmail.com"
                            {...register('email')}
                            value={input.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <FormErrorMessage className={styles.errorMessage}>
                                {errors.email.message}
                            </FormErrorMessage>
                        )}
                        <span className={styles.errorBackEnd}>{error}</span>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.password?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type={!showPassword ? 'password' : 'text'}
                                placeholder="•••••••••••••••"
                                {...register('password')}
                                value={input.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            )}

                            {ShowEye(styles.eyePass, showPassword, setShowPassword)}
                        </div>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.cpassword?.message}>
                        <FormLabel style={{ fontSize: '1.4rem' }}>
                            Confirmação de senha
                        </FormLabel>
                        <div style={{ position: 'relative' }}>
                            <Input
                                className={styles.input}
                                type={!showConfirmationPassword ? 'password' : 'text'}
                                placeholder="•••••••••••••••"
                                {...register('cpassword')}
                                value={input.cpassword}
                                onChange={handleInputChange}
                            />
                            {errors.cpassword && (
                                <FormErrorMessage className={styles.errorMessage}>
                                    {errors.cpassword.message}
                                </FormErrorMessage>
                            )}
                            {ShowEye(
                                styles.eyeCPass,
                                showConfirmationPassword,
                                setShowConfirmationPassword
                            )}
                        </div>
                    </FormControl>
                    <Button className={styles.btn} type="submit">
                        {!btnCadaster ? (
                            'Cadastrar'
                        ) : (
                            <CircularProgress
                                isIndeterminate
                                color="green.300"
                                size="35px"
                            />
                        )}
                    </Button>
                    <Toaster position="top-center" reverseOrder={false} />
                </form>

                <Link href="/" className={styles.link}>
                    Já tem cadastro? Clique aqui!
                </Link>
            </section>
        </main>
    );
}
