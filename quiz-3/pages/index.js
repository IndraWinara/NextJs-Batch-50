import Image from 'next/image'
import { Inter } from 'next/font/google'
import LayoutRoot from '@/layouts'
import Card from '@/components/Card'
import ModalCreate from '@/components/ModalCreate'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ repo }) {
  return (
    <LayoutRoot >
      <main className='p-2 mt-[90px] flex flex-wrap justify-center gap-2'>
        {repo?.data?.map((ress) => (
          <Card data={ress} key={ress?.id} />
        ))}
      </main>
    </LayoutRoot>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://127.0.0.1:3000/api/notes')
  const repo = await res.json()
  return { props: { repo } }
}