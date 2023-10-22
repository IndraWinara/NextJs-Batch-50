import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-[2px] bg-white border-slate-400 w-full md:h-[100px] h-[60px] p-5 flex md:flex-col justify-center items-center'>
      <div className='flex items-center justify-center gap-2'>
        <div>
          <Image src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3244252/nextjs-icon-md.png' alt='footer' width={40} height={40} />
        </div>
        <h1 className='font-bold text-xl'>ote's Apps</h1>
      </div>
      <div className='flex justify-center items-center p-2'>
        <h1 className='font-bold md:text-[15px] text-[13px]'>© 2023 Indra Winara™</h1>
      </div>
    </div>
  )
}

export default Footer