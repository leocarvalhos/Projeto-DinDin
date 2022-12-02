import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/images/logo.svg';
import Coin from '../../../public/images/coin.svg';
import Out from '../../../public/images/out.svg';
import Profile from '../../../public/images/profile.svg';
import styles from '../../styles/components/Header.module.sass';

export default function Header({ setShowModal, setShowCoin }: any) {
	return (
		<main className={styles.container}>
			<div className={styles.images}>
				<Image priority src={Logo} alt='logo' width={120} height={120} />
				<div>
					<Image priority src={Coin} alt='logo' className={styles.coin} width={40} height={40} onClick={() => setShowCoin(true)} />
					<Image priority src={Profile} style={{ cursor: 'pointer' }} alt='profile' width={50} height={50} onClick={() => setShowModal(true)} />
					<Link href='/'>
						<Image priority src={Out} alt='out' width={27} height={27} style={{ cursor: 'pointer' }} />
					</Link>
				</div>
			</div>
		</main>
	);
}
