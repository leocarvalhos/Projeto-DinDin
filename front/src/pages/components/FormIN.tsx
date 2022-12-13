import styles from '../../styles/components/FormIN.module.sass';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import EyeOpen from '../../../public/images/eye-open.svg';
import EyeClosed from '../../../public/images/eye-closed.svg';
import Logo from '../../../public/images/logoViolet.svg';
import IForm from '../../interfaces/IForm.type';
import Link from 'next/link';
export default function FormIN() {
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [input, setInput] = useState<IForm>({
		email: '',
		password: '',
	});

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<main className={styles.main}>
			<section>
				<Image priority src={Logo} alt='Logo' className={styles.logo} />
				<h2>Conecte-se</h2>
				<FormControl isInvalid={error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
					<Input className={styles.input} type='email' name='email' value={input.email} onChange={handleInputChange} />
					{error && <FormErrorMessage>Email ou senha incorretos.</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
					<Input className={styles.input} type={!show ? 'password' : 'text'} name='password' value={input.password} onChange={handleInputChange} />
					{error && <FormErrorMessage>Email ou senha incorretos.</FormErrorMessage>}
					{!show ? (
						<Image priority src={EyeClosed} alt='eye-closed' className={styles.eye} onClick={() => setShow(true)} width={35} height={35} />
					) : (
						<Image priority src={EyeOpen} alt='eye-open' className={styles.eye} onClick={() => setShow(false)} width={35} height={35} />
					)}
					<Link href='/home'>
						<Button className={styles.btn}>Entrar</Button>
					</Link>
					<Link href={'/sign-up'}>
						<Button className={styles.btnRegister}>Cadastre-se</Button>
					</Link>
				</FormControl>
			</section>
		</main>
	);
}
