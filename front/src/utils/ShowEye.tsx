import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import EyeClosed from '../../public/images/eye-closed.svg';
import EyeOpen from '../../public/images/eye-open.svg';
export default function ShowEye(name: any, show: boolean, setShow: Dispatch<SetStateAction<boolean>>) {
    return (!show ?
        <Image
            src= { EyeClosed }
            alt = 'eye-closed'
            className = { name }
            width = { 35}
            height = { 35}
            onClick = {() => setShow(true)
}
/>
            :
<Image
            src={ EyeOpen }
            alt = 'eye-open'
            className = { name }
            onClick = {() => setShow(false)}
            width = { 35}
            height = { 35}
    />)
}