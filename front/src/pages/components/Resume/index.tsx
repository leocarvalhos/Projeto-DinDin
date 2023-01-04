import { Button } from '@chakra-ui/react';
import styles from './styles.module.sass';
interface Props {
    value: {
        profit?: string;
        expenses?: number;
        balance?: number;
    };
}
export default function Resume({ value }: Props) {
    return (
        <main className={styles.container}>
            <section>
                <h1>Resumo</h1>
                <strong>
                    Entradas
                    <span className={styles.profit}>{`R$ ${Number(
                        value?.profit
                    ).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</span>
                </strong>
                <strong className={styles.border}>
                    Saídas
                    <span className={styles.expenses}>{`R$ ${Number(
                        value?.expenses
                    ).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</span>
                </strong>
                <strong>
                    Saldo
                    <span className={styles.balance}>{`R$ ${Number(
                        value?.balance
                    ).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</span>
                </strong>
            </section>
            <Button>Adicionar Registro</Button>
        </main>
    );
}