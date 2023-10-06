import React from 'react'
import Group from './GroupSection/Group';
import HidePanel from './HidePanel';


const SidePanel = () => {

  return (
    <div className='w-[250px] p-2 h-screen bg-gray-100 border-r-[1px] border-gray-300 fixed'>
      <div className='mt-2 flex items-center'>
        <>
          <HidePanel />
        </>
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