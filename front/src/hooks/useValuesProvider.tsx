import { useLocalStorage } from 'react-use';
export default function useValuesProvider() {
    const [user, setUser, remove] = useLocalStorage('user', {});

    return {
        user,
        setUser,
        remove,
    };
}
