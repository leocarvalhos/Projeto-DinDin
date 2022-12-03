import { useState } from 'react';
import styles from '../../styles/components/Home.module.sass';
import Filter from '../components/Filter';
import FormAddReg from '../components/FormAddReg';
import FormEditProfile from '../components/FormEditProfile';
import Header from '../components/Header';
import Resume from '../components/Resume';
import ResumeDesk from '../components/ResumeDesk';
import Table from '../components/Table';
export default function Home() {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showCoin, setShowCoin] = useState<boolean>(false);
	const [showAddReg, setShowAddReg] = useState<boolean>(false);

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
						<Resume setShowCoin={setShowCoin} setShowAddReg={setShowAddReg} />
					</div>
				)}
				{showAddReg && (
					<div className={styles.modal}>
						<FormAddReg setShowAddReg={setShowAddReg} />
					</div>
				)}

				<div className={styles.divResume}>
					<div className={styles.filterTable}>
						<Filter />
						<Table />
					</div>
					<ResumeDesk setShowAddReg={setShowAddReg} />
				</div>
			</main>
		</>
	);
}
