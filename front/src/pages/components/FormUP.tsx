import styles from '../../styles/components/FormUP.module.sass';

import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import EyeOpen from '../../../public/images/eye-open.svg';
import EyeClosed from '../../../public/images/eye-closed.svg';

import IFormUP from '../../interfaces/IFormUP.type';
import Link from 'next/link';
export default function FormUP() {
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [input, setInput] = useState<IFormUP>({
		name: '',
		email: '',
		password: '',
		cpassword: '',
	});

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<main className={styles.main}>
			<section>
				<h2>Cadastre-se</h2>
				<FormControl isInvalid={error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
					<Input className={styles.input} type='text' name='name' value={input.name} onChange={handleInputChange} />
					{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
					<Input className={styles.input} type='email' name='email' value={input.email} onChange={handleInputChange} />
					{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
					<Input className={styles.input} type={!show ? 'password' : 'text'} name='password' value={input.password} onChange={handleInputChange} />
					{error && <FormErrorMessage>Password is required.</FormErrorMessage>}
					{!show ? (
						<Image src={EyeClosed} alt='eye-closed' className={styles.eyePass} onClick={() => setShow(true)} width={35} height={35} />
					) : (
						<Image src={EyeOpen} alt='eye-open' className={styles.eyePass} onClick={() => setShow(false)} width={35} height={35} />
					)}
					<FormLabel style={{ fontSize: '1.4rem' }}>Confirmação de senha</FormLabel>
					<Input className={styles.input} type={!show ? 'password' : 'text'} name='cpassword' value={input.cpassword} onChange={handleInputChange} />
					{error && <FormErrorMessage>Password Confirmation is required.</FormErrorMessage>}
					{!show ? (
						<Image src={EyeClosed} alt='eye-closed' className={styles.eyeCPass} onClick={() => setShow(true)} width={35} height={35} />
					) : (
						<Image src={EyeOpen} alt='eye-open' className={styles.eyeCPass} onClick={() => setShow(false)} width={35} height={35} />
					)}
					<Button className={styles.btn}>Enviar</Button>
				</FormControl>
				<Link href='/' className={styles.link}>
					Já tem cadastro? Clique aqui!
				</Link>
			</section>
		</main>
	);
}
