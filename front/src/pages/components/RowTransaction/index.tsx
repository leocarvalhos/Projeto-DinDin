import { Td, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BtnDelete from '../../../../public/images/btn-deleted.svg';
import BtnEdit from '../../../../public/images/btn-edit.svg';
import ICategory from '../../../interfaces/ICategory.type';
import ITransactions from '../../../interfaces/ITransactions.type';
import dateFormated from '../../../utils/dateFormated';
import formatedCurrency from '../../../utils/formatedCurrency';
import DeleteTransaction from '../DeleteTransaction';
import EditFormTransaction from '../UpdateTransaction';
import styles from './styles.module.sass';
interface Props {
    transaction: ITransactions;
    getTransactions(): Promise<void>;
    setModalEditTransaction: Dispatch<SetStateAction<boolean>>;
}
export default function RowTransaction({
    transaction,
    getTransactions,
    setModalEditTransaction,
}: Props) {
    const [deleteTransaction, setDeleteTransaction] = useState(false);

    return (
        <Tr className={styles.tr}>
            <Td>{new Date(transaction?.date).toLocaleDateString()}</Td>
            <Td>{dateFormated(new Date(transaction?.date).getDay())}</Td>
            <Td>{transaction?.description}</Td>
            <Td>{transaction?.category.description}</Td>
            <Td
                style={{
                    color: `${transaction?.type === 'entrada' ? '#7B61FF' : '#FA8C10'}`,
                    fontWeight: '700',
                }}
            >
                {formatedCurrency(transaction?.value)}
            </Td>

            <Td className={styles.btn}>
                <Image
                    src={BtnEdit}
                    alt="edit"
                    width={30}
                    height={30}
                    onClick={() => {
                        document.body.classList.add('overflow-hidden');
                        setModalEditTransaction(true);
                    }}
                />

                <div style={{ position: 'relative' }}>
                    <Image
                        src={BtnDelete}
                        onClick={() => {
                            setDeleteTransaction(!deleteTransaction);
                        }}
                        alt="delete"
                        width={30}
                        height={30}
                    />
                    {deleteTransaction && (
                        <DeleteTransaction
                            getTransactions={getTransactions}
                            transaction={transaction}
                            deleteTransaction={deleteTransaction}
                            setDeleteTransaction={setDeleteTransaction}
                        />
                    )}
                </div>
            </Td>
        </Tr>
    );
}
