import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import Logo from '../../../public/images/logo.svg';
import styles from './styles.module.sass';

import Link from 'next/link';

import api from '../../api';
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';

export default function SignIn() {
    async function wakeAPI() {
        try {
            await api.get('/health-check ');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        wakeAPI();
    }, []);
    return (
        <main className={styles.main}>
            <section className={styles.textSignUp}>
                <Image priority src={Logo} className={styles.logo} alt="logo" />
                <h1>
                    Controle suas <span>finanças</span>, sem planilha chata.
                </h1>
                <p>
                    Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
                    tudo num único lugar e em um clique de distância.
                </p>
                <Link href="/sign-up">
                    <Button className={styles.btn}>Cadastre-se</Button>
                </Link>
            </section>
            <section className={styles.formSignIn}>
                <LoginForm />
            </section>
        </main>
    );
}
