import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.sass';
interface Props {
    value: {
        profit?: string;
        expenses?: number;
        balance?: number;
    };
    setShowAddReg: Dispatch<SetStateAction<boolean>>;
}
export default function Resume({ value, setShowAddReg }: Props) {
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
            <Button
                onClick={() => {
                    setShowAddReg(true);
                    document.body.classList.add('overflow-hidden');
                }}
            >
                Adicionar Registro
            </Button>
        </main>
    );
}
