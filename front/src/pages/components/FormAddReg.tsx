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
		type: 'entrada',
	});

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}
	function handlerInputType(e: any) {
		setInput({ ...input, [e.target.name]: e.target.value });
	}
	console.log(input);
	return (
		<div className={styles.container}>
			<main>
				<h1>Adicionar Registro</h1>
				<Image src={X} alt='x' className={styles.x} onClick={() => setShowAddReg(false)} />
				<FormControl isInvalid={error}>
					<div className={styles.buttons}>
						<Button
							style={{ borderRadius: '10px 0px 0px 10px', backgroundColor: `${input.type === 'entrada' ? '#3A9FF1' : '#B9B9B9'}  ` }}
							onClick={handlerInputType}
							name='type'
							value='entrada'
						>
							Entrada
						</Button>
						<Button
							style={{ borderRadius: '0px 10px 10px 0px', backgroundColor: `${input.type === 'saida' ? '#FF576B' : '#B9B9B9'}  ` }}
							onClick={handlerInputType}
							name='type'
							value='saida'
						>
							Saida
						</Button>
					</div>
					<FormLabel style={{ fontSize: '1.4rem' }}>Valor</FormLabel>
					<Input className={styles.input} id='1' type='number' name='value' onChange={handleInputChange} />
					{error && <FormErrorMessage>Valor é obrigatório!</FormErrorMessage>}

					<FormLabel style={{ fontSize: '1.4rem' }}>Categoria</FormLabel>
					<Select placeholder='Seleciona a categoria' style={{ fontSize: '1.4rem' }} onClick={handlerInputType} name='category'>
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
