import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';

const DetailContact = ({ data }) => {
  const router = useRouter()

  return (
    <div className='flex bg-white flex-col gap-2 p-5 md:w-[500px] md:h-[400px] w-[300px] h-[400px] border-t-[4px] border-blue-500 border-[1px]  shadow-xl rounded-lg'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-bold text-center'>Detail Contact</h1>
        <button onClick={() => router.push('/home/contacts')}>
          <ArrowBackIosIcon className='text-sky-500 hover:scale-105 duration-300' sx={{ fontSize: 30 }} />
        </button>
      </div>

      <div>
        <p>Name : {data?.name}</p>
        <p>Username : {data?.username}</p>
        <p>Phone : {data?.phone}</p>
        <p>email : {data?.email}</p>
        <p>Website : {data?.website}</p>
      </div>
    </div>
  )
}

export default DetailContact