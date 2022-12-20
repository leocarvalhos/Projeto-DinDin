import { useLocalStorage } from 'react-use';
import IStorage from '../interfaces/IStorage.type';
export default function useValuesProvider(): IStorage {
    const [user, setUser, remove] = useLocalStorage('user', {});

    return {
        user,
        setUser,
        remove,
    };
}
