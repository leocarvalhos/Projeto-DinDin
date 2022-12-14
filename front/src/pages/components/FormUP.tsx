import styles from '../../styles/components/FormUP.module.sass';

import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, MouseEvent, useState, useRef } from 'react';
import Image from 'next/image';
import EyeOpen from '../../../public/images/eye-open.svg';
import EyeClosed from '../../../public/images/eye-closed.svg';
import LogoViolet from '../../../public/images/logoViolet.svg';
import LogoDefault from '../../../public/images/logo.svg';
import IFormUP from '../../interfaces/IFormUP.type';
import Link from 'next/link';


export default function FormUP() {
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [show, setShow] = useState({
		password: false,
		cpassword: false,
	});
	const [input, setInput] = useState<IFormUP>({
		name: '',
		email: '',
		password: '',
		cpassword: '',
	});

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput({...input,[e.target.name]: e.target.value});
	}


	return (
		<main className={styles.main}>
			<section>
				<h2>Cadastre-se</h2>
				
				<Image priority src={LogoViolet} className={styles.logo} alt='logo' />
				<Image priority src={LogoDefault} className={styles.logoDefault} alt='logo' />
				
				<FormControl isInvalid={error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
					<Input
						className={styles.input}
						id='1'
						type='text'
						name='name'
						value={input.name}
						onChange={handleInputChange}
					/>
					{error && <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
					<Input
						className={styles.input}
						type='email'
						id='2'
						name='email'
						value={input.email}
						onChange={handleInputChange}
					/>
					{error && <FormErrorMessage>Email é obrigatório.</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
					<Input
						className={styles.input}
						type={!show.password ? 'password' : 'text'}
						id='3'
						name='password'
						value={input.password}
						onChange={handleInputChange}
					/>
					{error && <FormErrorMessage>Senha é obrigatória.</FormErrorMessage>}
					{!show.password ? (
						<Image
							priority
							src={EyeClosed}
							alt='eye-closed'
							className={styles.eyePass}
							width={35}
							height={35}
							onClick={() => setShow({...show, password: true} )}
						/>
					) : (
						<Image
							priority
							src={EyeOpen}
							alt='eye-open'
							className={styles.eyePass}
							onClick={() => setShow({...show, password: false} )}			
							width={35}
							height={35}
						/>
					)}
					<FormLabel style={{ fontSize: '1.4rem' }}>Confirmação de senha</FormLabel>
					<Input
						className={styles.input}
						type={!show.cpassword ? 'password' : 'text'}
						id='4'
						name='cpassword'
						value={input.cpassword}
						onChange={handleInputChange}
					/>
					{error && <FormErrorMessage>Confirmação de senha obrigatória.</FormErrorMessage>}
					{!show.cpassword ? (
						<Image
							priority
							src={EyeClosed}
							alt='eye-closed'
							className={styles.eyeCPass}
							onClick={() => setShow({...show, cpassword: true} )}		
							width={35}
							height={35}
						/>
					) : (
						<Image
							priority
							src={EyeOpen}
							alt='ceye-open'
							className={styles.eyeCPass}
							onClick={() => setShow({...show, cpassword: false} )}
							width={35}
							height={35}
						/>
					)}
					<Button className={styles.btn}>Cadastrar</Button>
				</FormControl>
				<Link href='/' className={styles.link}>Já tem cadastro? Clique aqui!</Link>
			</section>
		</main>
	);
}
