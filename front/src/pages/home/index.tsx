import { useState } from 'react';
import styles from '../../styles/components/Home.module.sass';
import Filter from '../components/Filter';
import FormEditProfile from '../components/FormEditProfile';
import Header from '../components/Header';
export default function Home() {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<>
			<Header setShowModal={setShowModal} />
			<main className={styles.main}>
				{showModal && (
					<div className={styles.modal}>
						<FormEditProfile setShowModal={setShowModal} />
					</div>
				)}

				<Filter />
			</main>
		</>
	);
}
