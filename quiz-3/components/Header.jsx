import Image from 'next/image'
import React from 'react'
import ModalCreate from './ModalCreate'

const Header = () => {
  return (
    <header className='fixed z-10 bg-slate-300 w-full p-2 h-[80px] flex justify-between'>
      {/* logo */}
      <div className='flex items-center gap-2'>
        <div>
          <Image src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3244252/nextjs-icon-md.png' alt='header' width={40} height={40} />
        </div>
        <h1 className='font-bold text-xl'>ote's Apps</h1>
      </div>
      <div className='flex items-center w-fit'>
        <ModalCreate />
      </div>
    </header>
  )
}

export default Header