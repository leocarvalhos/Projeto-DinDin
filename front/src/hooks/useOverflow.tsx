import { useContext } from 'react';
import { OverflowContext } from '../context/OverflowContext';

export default function useOverflow() {
    return useContext(OverflowContext);
}
