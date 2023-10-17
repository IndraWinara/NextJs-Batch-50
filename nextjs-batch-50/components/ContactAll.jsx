import Link from 'next/link'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';


const ContactAll = ({ data }) => {
  const router = useRouter()
  return (
    <div className='flex bg-white flex-col p-5 md:w-[500px] md:h-[400px] w-[300px] h-[400px] border-t-[4px] border-blue-500 border-[1px]  shadow-xl rounded-lg'>
      <div className='flex justify-between mb-5'>
        <p className='text-xl font-bold text-center'>MyContact</p>
        <button onClick={() => router.push('/home')}>
          <ArrowBackIosIcon className='text-sky-500 hover:scale-105 duration-300' sx={{ fontSize: 30 }} />
        </button>
      </div>
      <div className='flex flex-col'>
        {data.map((res) => (
          <div key={res.id}>
            <Link href={`/home/contacts/${res.id}`}>{res.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactAll


