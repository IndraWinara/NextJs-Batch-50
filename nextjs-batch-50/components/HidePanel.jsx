import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import CallIcon from '@mui/icons-material/Call';

const HidePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>
        <MenuIcon sx={{ fontSize: 28 }} className='mx-2 text-gray-400 cursor-pointer' />
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>User Account</DrawerHeader>
          <DrawerBody>
            <div className='text-[15px] font-bold h-[300px]'>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <GroupIcon />
                <p className=''>New Group</p>
              </div>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <SpeakerPhoneIcon className='rotate-90' />
                <p className=''>New Chanel</p>
              </div>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <AccountCircleIcon />
                <p className=''>Contacts</p>
              </div>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <CallIcon />
                <p className=''>Calls</p>
              </div>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <BookmarkIcon />
                <p className=''>Saved Messages</p>
              </div>
              <div className='flex items-center gap-5 p-2 hover:px-3 duration-300 hover:bg-gray-300 cursor-pointer'>
                <SettingsIcon />
                <p className=''>Settings</p>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default HidePanel