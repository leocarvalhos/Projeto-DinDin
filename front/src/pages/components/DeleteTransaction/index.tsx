import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.sass';
interface Props {
    deleteTransaction: any;
    setDeleteTransaction: any;
}
export default function DeleteTransaction({
    deleteTransaction,
    setDeleteTransaction,
}: Props) {
    return (
        <div className={styles.container}>
            <p>Apagar item?</p>
            <div>
                <Button style={{ background: '#3A9FF1' }}>Sim</Button>
                <Button
                    style={{ background: '#FF576B' }}
                    onClick={() => setDeleteTransaction(false)}
                >
                    Não
                </Button>
            </div>
        </div>
    );
}
