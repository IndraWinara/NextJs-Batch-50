import { Inter } from 'next/font/google';
import LoginScreen from './login';
import { ChakraProvider } from '@chakra-ui/react';


const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  return (
    <ChakraProvider>
      <LoginScreen />
    </ChakraProvider>
  );
}
