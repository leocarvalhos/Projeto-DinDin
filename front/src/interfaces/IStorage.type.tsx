import { Dispatch, SetStateAction } from 'react';

export default interface IStorage {
    setUser: Dispatch<SetStateAction<{} | undefined>>;
    user: {} | undefined;
    remove(): void;
}
