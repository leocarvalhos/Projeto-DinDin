import { Dispatch, SetStateAction } from 'react';
export default interface IOverflow {
    setOverflow: Dispatch<SetStateAction<boolean>>;
    overflow: boolean;

}
