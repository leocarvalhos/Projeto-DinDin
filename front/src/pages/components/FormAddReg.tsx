import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IFormReg } from '../../interfaces/IFormReg.type';
import styles from '../../styles/components/AddReg.module.sass';
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
			<main>
				<FormControl isInvalid={error}>
					<FormLabel style={{ fontSize: '1.4rem' }}>Valor</FormLabel>
					<Input className={styles.input} id='1' type='number' name='value' onChange={handleInputChange} />
					{error && <FormErrorMessage>Valor é obrigatório!</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Categoria</FormLabel>
					<Input className={styles.input} type='text' id='2' name='category' onChange={handleInputChange} />
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
