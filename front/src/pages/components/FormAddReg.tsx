import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IFormReg } from '../../interfaces/IFormReg.type';
import styles from '../../styles/components/AddReg.module.sass';

import X from '../../../public/images/x.svg';
import Image from 'next/image';
export default function FormAddReg({ setShowAddReg }: any) {
	const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [input, setInput] = useState<IFormReg>({
		value: 0,
		category: '',
		date: new Date(),
		description: '',
	});

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}

	return (
		<div className={styles.container}>
			<h1>Adicionar Registro</h1>
			<Image src={X} alt='x' className={styles.x} onClick={() => setShowAddReg(false)} />
			<main>
				<FormControl isInvalid={error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Valor</FormLabel>
					<Input className={styles.input} id='1' type='number' name='value' onChange={handleInputChange} />
					{error && <FormErrorMessage>Valor é obrigatório!</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Categoria</FormLabel>
					<Select placeholder='Seleciona a categoria' style={{ fontSize: '1.4rem' }} name='category'>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
					{error && <FormErrorMessage>Categoria é obrigatório!</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Data</FormLabel>
					<Input className={styles.input} id='3' name='date' type='text' onChange={handleInputChange} />
					{error && <FormErrorMessage>Data é obrigatório!</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Descrição</FormLabel>
					<Input className={styles.input} type='text' id='4' name='description' onChange={handleInputChange} />
					{error && <FormErrorMessage>Email is required.</FormErrorMessage>}

					<Button className={styles.btn}>Confirmar</Button>
				</FormControl>
			</main>
		</div>
	);
}
