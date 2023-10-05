import React from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


const Main = () => {
  return (
    <div className='p-2 w-[500px]'>
      <div className=' w-[100px] text-center mx-auto rounded-full bg-slate-500/20 text-sm font-bold text-gray-500/70'>October 5</div>
      <div className='flex flex-col'>
        <div className='bg-white h-[300px] mx-14 p-2 mt-2 w-[400px] rounded-xl flex flex-col justify-between'>
          <div>
            <p className='text-[14px] font-bold text-yellow-800'>Admin Next JS Batch-50</p>
            <p className='p-2 text-[14px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro reiciendis suscipit similique laborum voluptatibus voluptate. Tempore consequuntur, quod laboriosam eaque adipisci accusantium fugiat, totam nisi eligendi impedit dolorem cupiditate distinctio, quos placeat repudiandae quaerat enim natus! Repellendus facilis iure nulla maxime natus laudantium consequuntur ut ipsam delectus accusamus ipsum aut vero, corrupti inventore, eos quasi, animi fuga dolorum officia non!</p>
          </div>
          <div className='flex justify-end items-center gap-1'>
            <RemoveRedEyeOutlinedIcon sx={{ fontSize: 20 }} className=' text-gray-400' />
            <p className='text-[13px] text-gray-400'>12</p>
            <PushPinIcon sx={{ fontSize: 18 }} className='rotate-45 text-gray-400' />
            <h1 className='text-[12px] text-gray-400 '>13:40</h1>
          </div>
        </div>
        <div className=''>
          <img src='https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png' className='w-12 object-cover h-12 rounded-full shadow-xl' />
        </div>
      </div>
    </div>
  )
}

export default Main