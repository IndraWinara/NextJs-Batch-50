import { Inter } from 'next/font/google';
import Hero from '@/components/Hero';
import Layout from '@/Layout';


const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
