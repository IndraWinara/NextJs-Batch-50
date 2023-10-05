import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Footer = () => {
  return (
    <div className='h-12 bg-gray-200 w-full flex items-center fixed bottom-0 left-[250px] border-[1px] border-gray-300'>
      <div className='w-full flex items-center gap-3'>
        <AttachFileIcon sx={{ fontSize: 30 }} className='rotate-45 text-gray-400 mx-2 cursor-pointer' />
        <input placeholder='Write a message....' className='bg-gray-200 h-10 outline-none' />
      </div>
      <div className='pr-[350px]  w-[200px] flex h-[60px] gap-2 items-center'>
        <EmojiEmotionsIcon className='text-gray-400 cursor-pointer' />
        <MicIcon className='text-gray-400 cursor-pointer' />
      </div>
    </div>
  )
}

export default Footer