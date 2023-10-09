import SidePanel from "@/components/SidePanel"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react'


const Layout = ({ children, metaTitle, metaDescription }) => {
  return (
    <ChakraProvider>
      <Head>
        <title>{`ChatClone - ${metaTitle ? metaTitle : 'Main'}`}</title>
        <meta name="description" content={metaDescription ? metaDescription : 'the best chatbot in the world'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex'>
        <SidePanel />
        <div className='w-full flex flex-col justify-between'>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </ChakraProvider>
  )
}

export default Layout