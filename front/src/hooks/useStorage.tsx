import { useContext } from 'react';
import { StorageContext } from '../context/StorageContext';

export default function useStorage() {
    return useContext(StorageContext);
}
