import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import X from '../../../../public/images/x.svg';
import styles from './styles.module.sass';

interface Props {
    setShowCoin: Dispatch<SetStateAction<boolean>>;
    setShowAddReg: Dispatch<SetStateAction<boolean>>;
    value: {
        profit?: string;
        expenses?: number;
        balance?: number;
    };
}
export default function ResumeMobile({ setShowCoin, setShowAddReg, value }: Props) {
    return (
        <div className={styles.container}>
            <Image
                src={X}
                alt="x"
                width={25}
                height={25}
                className={styles.x}
                onClick={() => setShowCoin(false)}
            />
            <main>
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
