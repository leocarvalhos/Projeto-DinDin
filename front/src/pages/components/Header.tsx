import styles from '../../styles/components/Header.module.sass';
import Logo from '../../../public/images/logo.svg';
import Profile from '../../../public/images/profile.svg';
import Out from '../../../public/images/out.svg';

import Image from 'next/image';
import { useState } from 'react';
export default function Header({ setShowModal }: any) {
	return (
		<main className={styles.container}>
			<div className={styles.images}>
				<Image src={Logo} alt='logo' width={120} height={120} />
				<div>
					<Image src={Profile} alt='profile' width={50} height={50} onClick={() => setShowModal(true)} />
					<Image src={Out} alt='out' width={27} height={27} />
				</div>
			</div>
		</main>
	);
}
