import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import X from '../../../public/images/x.svg';
import styles from '../../styles/components/Resume.module.sass';
export default function Resume({ setShowCoin, setShowAddReg }: any) {
	return (
		<div className={styles.container}>
			<Image src={X} alt='x' width={25} height={25} className={styles.x} onClick={() => setShowCoin(false)} />
			<main>
				<h1>Resumo</h1>
				<strong>
					Entradas <span className={styles.profit}>$200,00</span>
				</strong>
				<strong className={styles.border}>
					Saídas <span className={styles.expenses}>$70,50</span>
				</strong>
				<strong>
					Saldo <span className={styles.balance}>129,50</span>
				</strong>
				<Button
					onClick={() => {
						setShowCoin(false);
						setShowAddReg(true);
					}}
				>
					Adicionar Registro
				</Button>
			</main>
		</div>
	);
}
