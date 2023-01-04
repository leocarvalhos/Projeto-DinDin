import { createContext } from 'react';
import useValuesProvider from '../hooks/useOverflowProvider';
import IOverflow from '../interfaces/IOverflow.type';

const OverflowContext = createContext<IOverflow | boolean>(false);

function OverflowProvider(props: any) {
    const useProvider = useValuesProvider();

    return (
        <OverflowContext.Provider value={useProvider}>
            {props.children}
        </OverflowContext.Provider>
    );
}

export { OverflowContext, OverflowProvider };
