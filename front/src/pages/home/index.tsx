import styles from '../../styles/components/Home.module.sass';
import FormEditProfile from '../components/FormEditProfile';
import Header from '../components/Header';
export default function Home() {
	return (
		<>
			<Header />
			<main className={styles.main}></main>
		</>
	);
}
