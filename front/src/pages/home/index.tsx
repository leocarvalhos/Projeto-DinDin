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
import EditProfileForm from '../components/EditProfileForm';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Resume from '../components/Resume';
import Table from '../components/Table';
import styles from './styles.module.sass';

export default function Home() {
    const router = useRouter();
    const { user }: IStorage = useStorage();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showCoin, setShowCoin] = useState<boolean>(false);
    const [showAddReg, setShowAddReg] = useState<boolean>(false);
    const [value, setValue] = useState({});
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
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
        } catch (error) {}
    }
    useEffect(() => {
        getValues();
        getCategories();
        getTransactions();
    }, []);

    return (
        <>
            <Header setShowModal={setShowModal} setShowCoin={setShowCoin} />
            <main className={styles.main}>
                {showModal && (
                    <div className={styles.modal}>
                        <EditProfileForm setShowModal={setShowModal} />
                    </div>
                )}
                {showCoin && (
                    <div className={styles.modal}>
                        <Resume
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

                <div className={styles.divResume}>
                    <div className={styles.filterTable}>
                        <Filter
                            categories={categories}
                            setTransactions={setTransactions}
                            getTransactions={getTransactions}
                        />
                        <Table transactions={transactions} />
                    </div>
                </div>
            </main>
        </>
    );
}
