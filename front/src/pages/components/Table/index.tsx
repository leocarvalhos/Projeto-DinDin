import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import BtnDelete from '../../../../public/images/btn-deleted.svg';
import BtnEdit from '../../../../public/images/btn-edit.svg';
import ITransactions from '../../../interfaces/ITransactions.type';
import dateFormated from '../../../utils/dateFormated';
import formatedCurrency from '../../../utils/formatedCurrency';
import styles from './styles.module.sass';
import DeleteTransaction from '../DeleteTransaction';
import { SyntheticEvent, useState } from 'react';
interface Props {
    transactions: ITransactions[];
}

export default function Tables({ transactions }: Props) {
    const [deleteTransaction, setDeleteTransaction] = useState(false);
    console.log(deleteTransaction);
    function funccc(e: any, transaction: any) {}
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
                                    <Tr key={transaction.id}>
                                        <Td>
                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString()}
                                        </Td>
                                        <Td>
                                            {dateFormated(
                                                new Date(transaction.date).getDay()
                                            )}
                                        </Td>
                                        <Td>{transaction.description}</Td>
                                        <Td>{transaction.category.description}</Td>
                                        <Td
                                            style={{
                                                color: `${
                                                    transaction.type === 'entrada'
                                                        ? '#7B61FF'
                                                        : '#FA8C10'
                                                }`,
                                                fontWeight: '700',
                                            }}
                                        >
                                            {formatedCurrency(transaction.value)}
                                        </Td>
                                        <Td className={styles.btn}>
                                            <Image
                                                src={BtnEdit}
                                                alt="edit"
                                                width={30}
                                                height={30}
                                            />
                                            <Image
                                                src={BtnDelete}
                                                onClick={(e) => {
                                                    funccc(e, transaction);
                                                    setDeleteTransaction(
                                                        !deleteTransaction
                                                    );
                                                }}
                                                alt="delete"
                                                width={30}
                                                height={30}
                                            />
                                        </Td>
                                        {deleteTransaction && (
                                            <DeleteTransaction
                                                deleteTransaction={deleteTransaction}
                                                setDeleteTransaction={
                                                    setDeleteTransaction
                                                }
                                            />
                                        )}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </main>
        </div>
    );
}
