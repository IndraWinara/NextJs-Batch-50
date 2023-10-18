import { useRouter } from 'next/router'
import React from 'react'

const HeaderNews = ({ add, home }) => {
  const router = useRouter()
  return (
    <div className='h-[100px] p-2 bg-login -500 mb-2 flex justify-between items-center'>
      <h1 onClick={() => router.push(home ? '/home' : '/news')} className='cursor-pointer text-xl font-bold'>Home</h1>
      {add ? '' : <button onClick={() => router.push('/news/add')} className='text-xl px-2 py-1 h-[50px] bg-sky-500 rounded-lg font-bold hover:scale-105 duration-150'>Create News</button>}
    </div>
  )
}

export default HeaderNews