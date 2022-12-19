import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { createContext} from 'react';
import  IUser  from '../interfaces/IUser.type';
import { useLocalStorage } from 'react-use';
export const StorageContext = createContext<IUser | null>(null)

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser, remove] = useLocalStorage('user', {});
	const contextValue: IUser = {
		user,
		setUser,
		remove
	}
	return (
		<ChakraProvider>
			<StorageContext.Provider value={contextValue}>
				<Component {...pageProps} />
				</StorageContext.Provider>
		</ChakraProvider>
	);
}
