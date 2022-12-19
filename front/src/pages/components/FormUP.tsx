import { Button, CircularProgress, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import EyeClosed from '../../../public/images/eye-closed.svg';
import EyeOpen from '../../../public/images/eye-open.svg';
import LogoDefault from '../../../public/images/logo.svg';
import LogoViolet from '../../../public/images/logoViolet.svg';
import api from '../../api';
import IFormUP from '../../interfaces/IFormUP.type';
import styles from '../../styles/components/FormUP.module.sass';

const schema = yup.object().shape({
	name: yup.string().required('Nome obrigatório.'),
	email: yup.string().required('Email obrigatório.').email(),
	password: yup.string().required('Senha obrigatória.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, "A senha deve conter ao menos um dígito, uma letra maiúscula, um caractere especial e oito dígitos;"),
	cpassword: yup.string().required('Confirmação de senha obrigatória.').oneOf([yup.ref('password')], 'As senhas precisam ser iguais.')
})

export default function FormUP() {
	const notify = () => toast.success('Cadastro bem sucedido!')
	const [error, setError] = useState('')
	const [btnCadaster, setBtnCadaster] = useState(false)
	const { register,
		handleSubmit,
		formState: { errors },
		reset }
		= useForm<IFormUP>({ resolver: yupResolver(schema) })
	const router = useRouter()

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
	
	async function handleForm(data: IFormUP) {
			
		try {
			setBtnCadaster(true)
			await api.post('/users', input)
			notify()
			setTimeout(() => {
				router.push('/')
				reset()
			},2000)
		} catch (error: any) {
			setBtnCadaster(false)
			console.log(error)
			if(error.response.data.message) {setError(error.response.data.message)}		
		}
	 }

	return (
		<main className={styles.main}>
			<section>
				<h2>Cadastre-se</h2>
				
				<Image priority src={LogoViolet} className={styles.logo} alt='logo' />
				<Image priority src={LogoDefault} className={styles.logoDefault} alt='logo' />
				
				<form onSubmit={handleSubmit(handleForm)}>
				<FormControl
				isInvalid={!!errors?.name?.message}
				>
					<FormLabel style={{ fontSize: '1.4rem' }}>Nome</FormLabel>
					<div style={{position: 'relative'}}>
						<Input
						className={styles.input}
						placeholder='Maria'
						type='text'
						{...register('name')}
						value={input.name}
						onChange={handleInputChange}
					/>
					{errors.name && <FormErrorMessage className={styles.errorMessage}>{errors.name.message}</FormErrorMessage>}
					</div>
					</FormControl>
					
					<FormControl
				isInvalid={!!errors?.email?.message || !!error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Email</FormLabel>
					<div style={{position: 'relative'}}>
						<Input
						className={styles.input}
						type='email'
						placeholder='maria@hotmail.com'
						{...register('email')}
						value={input.email}
						onChange={handleInputChange}
					/>
					{errors.email && <FormErrorMessage className={styles.errorMessage}>{errors.email.message}</FormErrorMessage>}
					<span className={styles.errorBackEnd}>{error}</span>
						</div>
					</FormControl>
				
				<FormControl
				isInvalid={!!errors?.password?.message}>
			
					<FormLabel style={{ fontSize: '1.4rem' }}>Senha</FormLabel>
					<div style={{position: 'relative'}}>
						<Input
						className={styles.input}
						type={!show.password ? 'password' : 'text'}
						placeholder='•••••••••••••••'
						{...register('password')}
						value={input.password}
						onChange={handleInputChange}
					/>
					{errors.password && <FormErrorMessage className={styles.errorMessage}>{errors.password?.message}</FormErrorMessage>}
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
							</div>
				</FormControl>

				<FormControl
				isInvalid={!!errors?.cpassword?.message}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Confirmação de senha</FormLabel>
					<div style={{position: 'relative'}}>
						<Input
						className={styles.input}
						type={!show.cpassword ? 'password' : 'text'}
						placeholder='•••••••••••••••'
						{...register('cpassword')}
						value={input.cpassword}
						onChange={handleInputChange}
					/>
							{errors.cpassword && <FormErrorMessage className={styles.errorMessage}>{errors.cpassword.message}</FormErrorMessage>}
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
							</div>
					</FormControl>
					<Button className={styles.btn} type='submit' >{!btnCadaster ? 'Cadastrar' : <CircularProgress isIndeterminate color='green.300' size='35px' /> }</Button>
					<Toaster
					position="top-center"
					reverseOrder={false}
					/>
					</form>
				<Link href='/' className={styles.link}>Já tem cadastro? Clique aqui!</Link>
			</section>
		</main>
	);
}
