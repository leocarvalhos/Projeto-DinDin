import Image from 'next/image';
import { useState } from 'react';
import Logo from '../../../public/images/logo.svg';
import Out from '../../../public/images/out.svg';
import Profile from '../../../public/images/profile.svg';
import styles from '../../styles/components/Header.module.sass';
import FormEditProfile from './FormEditProfile';

export default function Header() {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<main className={styles.container}>
			{showModal && <FormEditProfile setShowModal={setShowModal} />}
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
