import { Button } from '@chakra-ui/react';
import styles from '../../styles/components/ResumeDesk.module.sass';
export default function ResumeDesk({ setShowAddReg }: any) {
	return (
		<div className={styles.container}>
			<main>
				<h1>Resumo</h1>
				<strong>
					Entradas <span className={styles.profit}>$200,00</span>
				</strong>
				<strong className={styles.border}>
					Saídas <span className={styles.expenses}>$70,50</span>
				</strong>
				<strong style={{ fontWeight: 700 }}>
					Saldo <span className={styles.balance}>129,50</span>
				</strong>
			</main>
			<Button
				onClick={() => {
					setShowAddReg(true);
				}}
			>
				Adicionar Registro
			</Button>
		</div>
	);
}
