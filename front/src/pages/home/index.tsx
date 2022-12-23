import { useEffect, useState } from 'react';
import styles from '../../styles/components/Home.module.sass';
import Filter from '../components/Filter';
import FormAddReg from '../components/FormAddReg';
import FormEditProfile from '../components/FormEditProfile';
import Header from '../components/Header';
import Resume from '../components/Resume';
import ResumeDesk from '../components/ResumeDesk';
import Table from '../components/Table';
import headers from '../../utils/Token';
import useStorage from '../../hooks/useStorage';
import api from '../../api';

export default function Home() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showCoin, setShowCoin] = useState<boolean>(false);
    const [showAddReg, setShowAddReg] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions]: any = useState([]);
    const [value, setValue] = useState({});
    const { user }: any = useStorage();
    async function getValues() {
        try {
            const { data } = await api.get('/extract', headers(user.token));
            setValue(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getCategories() {
        try {
            const { data } = await api.get('/categories', headers(user.token));
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getTransactions() {
        try {
            const { data } = await api.get('/transactions', headers(user.token));
            setTransactions(data);
        } catch (error) {}
    }
    useEffect(() => {
        getValues();
        getCategories();
        getTransactions();
    }, []);

    console.log(transactions);
    return (
        <>
            <Header setShowModal={setShowModal} setShowCoin={setShowCoin} />
            <main className={styles.main}>
                {showModal && (
                    <div className={styles.modal}>
                        <FormEditProfile setShowModal={setShowModal} />
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
                        <FormAddReg
                            setShowAddReg={setShowAddReg}
                            categories={categories}
                        />
                    </div>
                )}

                <div className={styles.divResume}>
                    <div className={styles.filterTable}>
                        <Filter
                            categories={categories}
                            setTransactions={setTransactions}
                        />
                        <Table transactions={transactions} />
                    </div>
                    <ResumeDesk setShowAddReg={setShowAddReg} />
                </div>
            </main>
        </>
    );
}
