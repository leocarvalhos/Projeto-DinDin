import { useState } from 'react';
import styles from '../../styles/components/Home.module.sass';
import FormEditProfile from '../components/FormEditProfile';
import Header from '../components/Header';
export default function Home() {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<main className={styles.main}>
			<Header setShowModal={setShowModal} />
			{showModal && <FormEditProfile setShowModal={setShowModal} />}
			<section>resto</section>
		</main>
	);
}
