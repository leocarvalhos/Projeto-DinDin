import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Coin from '../../../../public/images/coin.svg';
import Logo from '../../../../public/images/logo.svg';
import Out from '../../../../public/images/out.svg';
import Profile from '../../../../public/images/profile.svg';
import useStorage from '../../../hooks/useStorage';
import IStorage from '../../../interfaces/IStorage.type';
import styles from './styles.module.sass';

interface Props {
    setShowCoin: Dispatch<SetStateAction<boolean>>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
export default function Header({ setShowModal, setShowCoin }: Props) {
    const { remove }: IStorage = useStorage();
    return (
        <main className={styles.container}>
            <div className={styles.images}>
                <Image priority src={Logo} alt="logo" width={120} height={120} />
                <div>
                    <Image
                        priority
                        src={Coin}
                        alt="logo"
                        className={styles.coin}
                        width={40}
                        height={40}
                        onClick={() => {
                            setShowCoin(true);
                            document.body.classList.add('overflow-hidden');
                        }}
                    />
                    <Image
                        priority
                        src={Profile}
                        style={{ cursor: 'pointer' }}
                        alt="profile"
                        width={50}
                        height={50}
                        onClick={() => {
                            document.body.classList.add('overflow-hidden');
                            setShowModal(true);
                        }}
                    />
                    <Link href="/">
                        <Image
                            priority
                            src={Out}
                            alt="out"
                            width={27}
                            height={27}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                remove!();
                            }}
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}
