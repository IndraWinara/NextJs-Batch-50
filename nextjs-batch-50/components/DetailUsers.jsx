import { useRouter } from 'next/router'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DetailUsers = () => {
  const router = useRouter()
  const { data } = router?.query
  const res = data ? JSON.parse(data) : null


  return (
    <div className='flex bg-white flex-col p-5 md:w-[500px] md:h-[400px] w-[300px] h-[400px] border-t-[4px] border-blue-500 border-[1px]  shadow-xl rounded-lg'>
      <div className='flex justify-between'>
        <p className='text-center font-bold text-xl'>Hello ,{res.name} 😊</p>
        <button onClick={() => router.push('/home')}>
          <ArrowBackIosIcon className='text-sky-500 hover:scale-105 duration-300' sx={{ fontSize: 30 }} />
        </button>
      </div>
      <div className='mt-5'>
        <p>This your personal information</p>
        <div className='p-2 first-letter:'>
          <p>Username : {res.name}</p>
          <p>Email : {res.email} </p>
          <p>Job : {res.Job} </p>
          <p>Hoby : {res.hobby} </p>
        </div>
      </div>
      <div className='h-full mt-5 flex justify-end items-end'>
        <button onClick={() => router.push('/')} className='bg-sky-300 font-bold h-14 hover:bg-white duration-200 md:w-full w-[100px] rounded-full border-[1px] border-sky-600'>Sign Out</button>
      </div>
    </div>
  )
}

export default DetailUsers
