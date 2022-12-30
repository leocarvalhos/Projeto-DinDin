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
import RowTransaction from '../RowTransaction';
interface Props {
    transactions: ITransactions[];
}

export default function Tables({ transactions }: Props) {
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
                                    <RowTransaction
                                        key={transaction.id}
                                        transaction={transaction}
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
