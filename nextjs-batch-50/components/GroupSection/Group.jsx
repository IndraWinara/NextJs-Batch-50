import React from 'react'
import PeopleIcon from '@mui/icons-material/People';

const Group = () => {
  return (
    <div className='flex gap-2 mb-6 hover:bg-gray-300 py-2 rounded-lg'>
      {/* icon group */}
      <div className='px-1'>
        <img src='https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png' className='w-12 object-cover h-12 rounded-full shadow-xl' />
      </div>
      {/* name group etc.. */}
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <PeopleIcon className='text-gray-700' />
          <h1 className='text-[13px] text-gray-700 font-bold'>Batch-50 NextJs </h1>
          <h1 className='text-[12px] text-gray-400 '>13:40</h1>
        </div>
        <div className='flex items-center gap-2'>
          <h1 className='text-[13px] text-sky-400 '>IndraWinara : Test...</h1>
        </div>
      </div>
    </div>
  )
}

export default Group