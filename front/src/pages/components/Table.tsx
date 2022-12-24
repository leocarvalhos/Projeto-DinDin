import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import BtnDelete from '../../../public/images/btn-deleted.svg';
import BtnEdit from '../../../public/images/btn-edit.svg';

import Image from 'next/image';
import styles from '../../styles/components/Table.module.sass';
import dateFormated from '../../utils/dateFormated';
import formatedCurrency from '../../utils/formatedCurrency';
interface Props {
    transactions: any;
}
export default function Tables({ transactions }: Props) {
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
                            {transactions?.map((transaction: any) => {
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
