import { Inter } from 'next/font/google';
import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const LoginScreenIC = dynamic(() => import('./login'), {
  loading: () => <p className='text-4xl'>Loading....</p>,
})

const inter = Inter({
  subsets: ['latin'],
});




export default function Home() {
  return (
    <ChakraProvider>
      <LoginScreenIC />
    </ChakraProvider>
  );
}
