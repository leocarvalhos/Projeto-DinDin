import Image from 'next/image';
import Logo from '../../../public/images/logo.svg';
import Out from '../../../public/images/out.svg';
import Profile from '../../../public/images/profile.svg';
import styles from '../../styles/components/Header.module.sass';

export default function Header({ setShowModal }: any) {
	return (
		<main className={styles.container}>
			<div className={styles.images}>
				<Image priority src={Logo} alt='logo' width={120} height={120} />
				<div>
					<Image priority src={Profile} style={{ cursor: 'pointer' }} alt='profile' width={50} height={50} onClick={() => setShowModal(true)} />
					<Image priority src={Out} alt='out' width={27} height={27} style={{ cursor: 'pointer' }} />
				</div>
			</div>
		</main>
	);
}
