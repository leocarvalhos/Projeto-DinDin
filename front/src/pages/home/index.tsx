import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../api';
import useStorage from '../../hooks/useStorage';
import ICategory from '../../interfaces/ICategory.type';
import IStorage from '../../interfaces/IStorage.type';
import ITransactions from '../../interfaces/ITransactions.type';
import { IValue } from '../../interfaces/IValue.type';
import headers from '../../utils/Token';
import AddFormTransaction from '../components/AddFormTransaction';
import UpdateProfile from '../components/UpdateProfile';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Resume from '../components/Resume';
import ResumeMobile from '../components/ResumeMobile';
import Table from '../components/TableTransactions';
import styles from './styles.module.sass';
import useOverflow from '../../hooks/useOverflow';
import EditFormTransaction from '../components/UpdateTransaction';
export default function Home() {
    const { overflow }: any = useOverflow();

    const router = useRouter();
    const { user }: IStorage = useStorage();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showCoin, setShowCoin] = useState<boolean>(false);
    const [showAddReg, setShowAddReg] = useState<boolean>(false);
    const [value, setValue] = useState({});
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [modalEditTransaction, setModalEditTransaction] = useState(false);
    useEffect(() => {
        if (!user?.token) {
            router.replace('/');
        }
    }, []);
    async function getValues() {
        try {
            const { data } = await api.get('/extract', headers(user?.token));
            setValue(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getCategories() {
        try {
            const { data } = await api.get('/categories', headers(user?.token));
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getTransactions() {
        try {
            const { data } = await api.get('/transactions', headers(user?.token));
            setTransactions(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
        getTransactions();
        getValues();
    }, []);

    return (
        <>
            <Header setShowModal={setShowModal} setShowCoin={setShowCoin} />
            <main className={styles.main}>
                {showModal && (
                    <div className={styles.modal}>
                        <UpdateProfile setShowModal={setShowModal} />
                    </div>
                )}
                {showCoin && (
                    <div className={styles.modal}>
                        <ResumeMobile
                            setShowCoin={setShowCoin}
                            setShowAddReg={setShowAddReg}
                            value={value}
                        />
                    </div>
                )}
                {showAddReg && (
                    <div className={styles.modal}>
                        <AddFormTransaction
                            setShowAddReg={setShowAddReg}
                            categories={categories}
                            getTransactions={getTransactions}
                        />
                    </div>
                )}
                {modalEditTransaction && (
                    <EditFormTransaction
                        setModalEditTransaction={setModalEditTransaction}
                        categories={categories}
                        getTransactions={getTransactions}
                        transactions={transactions}
                    />
                )}
                <div className={styles.divResume}>
                    <div className={styles.filterTable}>
                        <Filter
                            categories={categories}
                            setTransactions={setTransactions}
                            getTransactions={getTransactions}
                        />
                        <Table
                            transactions={transactions}
                            getTransactions={getTransactions}
                            setModalEditTransaction={setModalEditTransaction}
                        />
                    </div>
                    <Resume value={value} setShowAddReg={setShowAddReg} />
                </div>
            </main>
        </>
    );
}
