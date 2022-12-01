import styles from '../../styles/components/EditProfile.module.sass';
import X from '../../../public/images/x.svg';
import Image from 'next/image';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import Link from 'next/link';
import IFormUP from '../../interfaces/IFormUP.type';

import EyeOpen from '../../../public/images/eye-open.svg';
import EyeClosed from '../../../public/images/eye-closed.svg';
import { ChangeEvent, useState } from 'react';
export default function FormEditProfile({ setShowModal }: any) {
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
		<div className={styles.conteudo}>
			<FormControl isInvalid={error} className={styles.form}>
				<Image src={X} alt='x' className={styles.x} priority onClick={() => setShowModal(false)} />
				<h1>Editar Perfil</h1>

				<FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
				<Input className={styles.input} type='text' id='1' name='name' value={input.name} onChange={handleInputChange} />
				{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

				<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
				<Input className={styles.input} type='email' id='2' name='email' value={input.email} onChange={handleInputChange} />
				{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

				<FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
				<Input className={styles.input} type={!show ? 'password' : 'text'} id='3' name='password' value={input.password} onChange={handleInputChange} />
				{error && <FormErrorMessage>Password is required.</FormErrorMessage>}
				{!show ? (
					<Image src={EyeClosed} alt='eye-closed' priority className={styles.eyePass} onClick={() => setShow(true)} width={35} height={35} />
				) : (
					<Image src={EyeOpen} alt='eye-open' priority className={styles.eyePass} onClick={() => setShow(false)} width={35} height={35} />
				)}
				<FormLabel style={{ fontSize: '1.4rem' }}>Confirmação de senha</FormLabel>
				<Input className={styles.input} type={!show ? 'password' : 'text'} id='4' name='cpassword' value={input.cpassword} onChange={handleInputChange} />
				{error && <FormErrorMessage>Password Confirmation is required.</FormErrorMessage>}
				{!show ? (
					<Image src={EyeClosed} alt='eye-closed' priority className={styles.eyeCPass} onClick={() => setShow(true)} width={35} height={35} />
				) : (
					<Image src={EyeOpen} alt='eye-open' priority className={styles.eyeCPass} onClick={() => setShow(false)} width={35} height={35} />
				)}
				<Button className={styles.btn}>Atualizar</Button>
			</FormControl>
		</div>
	);
}
