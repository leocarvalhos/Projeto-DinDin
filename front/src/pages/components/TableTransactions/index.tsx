import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import ITransactions from '../../../interfaces/ITransactions.type';
import RowTransaction from '../RowTransaction';
import styles from './styles.module.sass';
interface Props {
    transactions: ITransactions[];
    getTransactions(): Promise<void>;
    setModalEditTransaction: Dispatch<SetStateAction<boolean>>;
    setGetOneTransaction: Dispatch<SetStateAction<ITransactions | undefined>>;
}

export default function TableTransactions({
    transactions,
    getTransactions,
    setModalEditTransaction,
    setGetOneTransaction,
}: Props) {
    return (
        <div className={styles.container}>
            <main>
                <TableContainer className={styles.tableContainer}>
                    <Table className={styles.table}>
                        <Thead className={styles.thead}>
                            <Tr>
                                <Th>Data</Th>
                                <Th>Dia da semana</Th>
                                <Th>Descrição</Th>
                                <Th>Categoria</Th>
                                <Th>Valor</Th>
                                <Th className={styles.adjust}>Editar ou Excluir</Th>
                            </Tr>
                        </Thead>
                        <Tbody className={styles.tBody}>
                            {transactions?.map((transaction: ITransactions) => {
                                return (
                                    <RowTransaction
                                        key={transaction.id}
                                        setGetOneTransaction={setGetOneTransaction}
                                        transaction={transaction}
                                        getTransactions={getTransactions}
                                        setModalEditTransaction={setModalEditTransaction}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </main>
        </div>
    );
}
