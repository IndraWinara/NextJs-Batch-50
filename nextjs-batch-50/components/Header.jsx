import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header = () => {
  return (
    <main className='w-full h-[60px] bg-gray-200 fixed top-0 left-[250px] border-[1px] border-gray-300'>
      <div className='flex justify-between'>
        <div className='p-1'>
          <h1 className='text-sm font-bold'>Batch-50 NextJs [Diskusi]</h1>
          <h1 className='text-[13px] text-gray-500'>13 member</h1>
        </div>
        <div className='pr-[350px]  w-[200px] flex h-[60px] gap-2 items-center'>
          <SearchIcon className='cursor-pointer' />
          <SpaceDashboardTwoToneIcon className='cursor-pointer' />
          <MoreVertIcon className='cursor-pointer' />
        </div>
      </div>
    </main>
  )
}

export default Header