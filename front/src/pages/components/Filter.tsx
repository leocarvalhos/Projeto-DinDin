import { Button, Card, CardBody, CardFooter, CardHeader, Text } from '@chakra-ui/react';
import Image from 'next/image';
import X from '../../../public/images/littleX.svg';
import Plus from '../../../public/images/+.svg';
import FilterIcon from '../../../public/images/filter-icon.svg';
import styles from '../../styles/components/Filter.module.sass';
import { useState } from 'react';
export default function Filter() {
	const [selected, setSelected] = useState<boolean>(false);
	const [showCard, setShowCard] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<Button className={styles.btnFilter} onClick={() => setShowCard(!showCard)}>
				<Image src={FilterIcon} alt='filter-logo' />
				Filtrar
			</Button>
			<div>
				{showCard && (
					<Card className={styles.card}>
						<CardHeader className={styles.cardHeader}>
							<Text className={styles.text}>Categoria</Text>
						</CardHeader>
						<CardBody className={styles.cardBody}>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Alimentação <Image src={!selected ? Plus : X} alt='+ or x' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Assinaturas e Serviços <Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Casa
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Mercado
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Cuidados Pessoais
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Educação
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Família
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Lazer
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Pets
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Presentes
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Roupas
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Saúde
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Transporte
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Salário
								<Image src={Plus} alt='+' />
							</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Vendas
								<Image src={Plus} alt='+' />
							</Button>
						</CardBody>
						<CardFooter className={styles.cardFooter}>
							<Button className={styles.btnInactive}>Limpar Filtros</Button>
							<Button className={!selected ? styles.btnInactive : styles.btnActive} onClick={() => setSelected(!selected)}>
								Aplicar Filtros
							</Button>
						</CardFooter>
					</Card>
				)}
			</div>
		</div>
	);
}
