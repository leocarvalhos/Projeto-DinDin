import { Thead, Tbody, Tr, Th, Td, TableContainer, Table } from '@chakra-ui/react';
import BtnEdit from '../../../public/images/btn-edit.svg';
import BtnDelete from '../../../public/images/btn-deleted.svg';

import styles from '../../styles/components/Table.module.sass';
import Image from 'next/image';
export default function Tables() {
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
							<Tr>
								<Td>inches</Td>
								<Td>millime</Td>
								<Td>25.4</Td>
								<Td>millime</Td>
								<Td>millime</Td>
								<Td className={styles.btn}>
									<Image src={BtnEdit} alt='edit' />
									<Image src={BtnDelete} alt='delete' />
								</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</main>
		</div>
	);
}
