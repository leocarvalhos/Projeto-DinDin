import styles from '../../styles/components/FormIN.module.sass';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import EyeOpen from '../../../public/images/eye-open.svg';
import EyeClosed from '../../../public/images/eye-closed.svg';

import IForm from '../../interfaces/IForm.type';
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
			<h2>Login</h2>
			<FormControl isInvalid={error}>
				<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
				<Input className={styles.input} type='email' name='email' value={input.email} onChange={handleInputChange} />
				{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

				<FormLabel style={{ fontSize: '1.4rem' }}>Password</FormLabel>
				<Input className={styles.input} type={!show ? 'password' : 'text'} name='password' value={input.password} onChange={handleInputChange} />
				{error && <FormErrorMessage>Password is required.</FormErrorMessage>}
				{!show ? (
					<Image src={EyeClosed} alt='eye-closed' className={styles.eye} onClick={() => setShow(true)} width={35} height={35} />
				) : (
					<Image src={EyeOpen} alt='eye-open' className={styles.eye} onClick={() => setShow(false)} width={35} height={35} />
				)}
				<Button className={styles.btn}>Entrar</Button>
			</FormControl>
		</main>
	);
}
