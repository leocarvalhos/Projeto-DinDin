import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { StorageProvider } from '../context/StorageContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <StorageProvider>
                <Component {...pageProps} />
            </StorageProvider>
        </ChakraProvider>
    );
}
