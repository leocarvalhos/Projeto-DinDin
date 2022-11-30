import styles from '../../styles/components/EditProfile.module.sass';
import X from '../../../public/images/x.svg';
import Image from 'next/image';

export default function FormEditProfile({ setShowModal }: any) {
	return (
		<main className={styles.container}>
			<section>
				<Image src={X} alt='x' className={styles.x} />
				<div>
					<h1>Editar Perfil</h1>
				</div>
			</section>
		</main>
	);
}
