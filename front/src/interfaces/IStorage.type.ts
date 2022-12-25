import { Dispatch, SetStateAction } from 'react';
import IUser from './IUser.type';

export default interface IStorage {
    setUser?: Dispatch<SetStateAction<{} | undefined>>;
    user?: IUser | undefined;
    remove?(): void;
}
