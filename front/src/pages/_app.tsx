import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { StorageProvider } from '../context/StorageContext';
import { OverflowProvider } from '../context/OverflowContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <OverflowProvider>
                <StorageProvider>
                    <Component {...pageProps} />
                </StorageProvider>
            </OverflowProvider>
        </ChakraProvider>
    );
}
