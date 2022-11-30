import styles from '../../styles/components/Header.module.sass';
import Menu from '../../../public/images/menu.svg';
import Logo from '../../../public/images/logo.svg';

import Image from 'next/image';
import { useState } from 'react';
import MenuOpionts from './MenuOptions';
export default function Header() {
	const [showMenuOptions, setShowMenuOptions] = useState<boolean>(true);
	return (
		<main className={styles.container}>
			<Image src={Menu} alt='menu' onClick={() => setShowMenuOptions(true)} width={40} height={40} className={styles.menu} />
			<Image src={Logo} alt='logo' width={135} height={135} className={styles.logo} />
			{showMenuOptions && <MenuOpionts setShowMenuOptions={setShowMenuOptions} />}
		</main>
	);
}
