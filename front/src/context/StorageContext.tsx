import { createContext } from 'react';
import useValuesProvider from '../hooks/useValuesProvider';
import IStorage from '../interfaces/IStorage.type';
const StorageContext = createContext<IStorage | {}>({});

function StorageProvider(props: any) {
    const useProvider = useValuesProvider();

    return (
        <StorageContext.Provider value={useProvider}>
            {props.children}
        </StorageContext.Provider>
    );
}

export { StorageContext, StorageProvider };
