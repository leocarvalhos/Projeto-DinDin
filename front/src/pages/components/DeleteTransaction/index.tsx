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
            <strong>Apagar item?</strong>
            <div>
                <Button>Sim</Button>
                <Button onClick={() => setDeleteTransaction(false)}>Não</Button>
            </div>
        </div>
    );
}
