import styles from '../../styles/components/Home.module.sass';
import Header from '../components/Header';
export default function Home() {
	return (
		<main className={styles.main}>
			<Header />
			<section>resto</section>
		</main>
	);
}
