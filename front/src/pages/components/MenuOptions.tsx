import Image from 'next/image';
import X from '../../../public/images/x.svg';
import styles from '../../styles/components/MenuOptions.module.sass';
import Profile from '../../../public/images/profile.svg';
import Out from '../../../public/images/out.svg';

export default function MenuOptions({ setShowMenuOptions }: any) {
	return (
		<main className={styles.container}>
			<Image src={X} alt='x' onClick={() => setShowMenuOptions(false)} className={styles.x} />

			<nav>
				<Image src={Profile} alt='profile' width={160} height={160} style={{ marginBottom: '30px' }} />
				<ul>
					<li>Editar Perfil</li>
					<li>Filtro</li>
					<li>
						<Image src={Out} alt='out' /> Sair
					</li>
				</ul>
			</nav>
		</main>
	);
}
