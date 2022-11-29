import { Button, Stack } from '@chakra-ui/react';
import Logo from '../../../public/images/logo.svg';
import Image from 'next/image';
import styles from '../../styles/components/SignIn.module.sass';
import FormIN from '../components/FormIN';
import Link from 'next/link';
export default function SignIn() {
	return (
		<main className={styles.main}>
			<Image src={Logo} className={styles.logo} alt='logo' />
			<section className={styles.sectionOne}>
				<h1>
					Controle suas <span>finanças</span>, sem planilha chata.
				</h1>
				<p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
				<Link href='/sign-up'>
					<Stack direction='row' spacing={4}>
						<Button className={styles.btn}>Cadastre-se</Button>
					</Stack>
				</Link>
			</section>
			<section className={styles.sectionTwo}>
				<FormIN />
			</section>
		</main>
	);
}
