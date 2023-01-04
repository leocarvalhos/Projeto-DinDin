import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import api from '../../../api';
import useStorage from '../../../hooks/useStorage';
import IStorage from '../../../interfaces/IStorage.type';
import ITransactions from '../../../interfaces/ITransactions.type';
import headers from '../../../utils/Token';
import styles from './styles.module.sass';
interface Props {
    deleteTransaction: boolean;
    setDeleteTransaction: Dispatch<SetStateAction<boolean>>;
    transaction: ITransactions;
    getTransactions(): Promise<void>;
}
export default function DeleteTransaction({
    deleteTransaction,
    setDeleteTransaction,
    transaction,
    getTransactions,
}: Props) {
    const { user }: IStorage = useStorage();
    async function deleteT(transaction: ITransactions) {
        await api.delete(`/transaction/${transaction.id}`, headers(user?.token));
        getTransactions();
    }
    return (
        <div className={styles.container}>
            <p>Apagar item?</p>
            <div>
                <Button
                    style={{ background: '#3A9FF1' }}
                    onClick={() => deleteT(transaction)}
                >
                    Sim
                </Button>
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
