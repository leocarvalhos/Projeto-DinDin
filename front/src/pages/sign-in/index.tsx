import { Button, Stack } from '@chakra-ui/react';
import Logo from '../../../public/images/logo.svg';
import Image from 'next/image';
import styles from '../../styles/components/SignIn.module.sass';
import FormIN from '../components/FormIN';
import Link from 'next/link';
export default function SignIn() {
	return (
		<main className={styles.main}>
			<section className={styles.textSignUp}>
				<Image priority src={Logo} className={styles.logo} alt='logo' />
				<h1>
					Controle suas <span>finanças</span>, sem planilha chata.
				</h1>
				<p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
				<Link href='/sign-up' className={styles.btn}>
					Cadastre-se
				</Link>
			</section>
			<section className={styles.formSignIn}>
				<FormIN />
			</section>
		</main>
	);
}
