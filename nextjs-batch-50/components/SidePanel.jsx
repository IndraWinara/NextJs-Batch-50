import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Group from './GroupSection/Group';

const SidePanel = () => {
  return (
    <div className='w-[250px] p-2 h-screen bg-gray-100 border-r-[1px] border-gray-300 fixed'>
      <div className='mt-2 flex items-center'>
        <MenuIcon sx={{ fontSize: 28 }} className='mx-2 text-gray-400 cursor-pointer' />
        <input placeholder='Search...' className='p-2 outline-gray-300 focus:bg-gray-100 rounded-full bg-gray-300 text-sm' />
      </div>
      {/* group */}
      <div className='mt-4 flex flex-col  cursor-pointer rounded-lg duration-150'>
        <Group />
        <Group />
        <Group />
        <Group />
      </div>
    </div>
  )
}

export default SidePanel