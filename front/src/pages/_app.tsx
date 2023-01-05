import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { StorageProvider } from '../context/StorageContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <StorageProvider>
                <Component {...pageProps} />
            </StorageProvider>
        </ChakraProvider>
    );
}
