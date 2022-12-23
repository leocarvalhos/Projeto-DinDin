import { Thead, Tbody, Tr, Th, Td, TableContainer, Table } from '@chakra-ui/react';
import BtnEdit from '../../../public/images/btn-edit.svg';
import BtnDelete from '../../../public/images/btn-deleted.svg';

import styles from '../../styles/components/Table.module.sass';
import Image from 'next/image';
interface Props {
    transactions: any;
}
function dateFormated(date: any) {
    switch (date) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda-Feira';
        case 2:
            return 'Terça-Feira';
        case 3:
            return 'Quarta-Feira';
        case 4:
            return 'Quinta-Feira';
        case 5:
            return 'Sexta-Feira';
        case 6:
            return 'Sábado';
    }
}
export default function Tables({ transactions }: Props) {
    console.log(transactions);
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
                            {transactions.map((transaction: any) => {
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
                                        <Td>{transaction.value}</Td>
                                        <Td className={styles.btn}>
                                            <Image src={BtnEdit} alt="edit" />
                                            <Image src={BtnDelete} alt="delete" />
                                        </Td>
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
