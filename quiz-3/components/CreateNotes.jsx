import { Button, Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const CreateNotes = ({ onClose }) => {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const router = useRouter()

  const handleCreate = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/notes/create', {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(notes)
    })
    router.push('/')
    onClose()
  }

  return (
    <form className='p-2 md:h-[500px] md:w-[500px] h-[500px]' onSubmit={handleCreate} >
      <div className='h-full w-[350px]' >
        <div className='flex flex-col'>
          <label className='font-bold'>Title</label>
          <input onChange={(e) => setNotes({ ...notes, title: e.target.value })} placeholder='title.....' type='text' className='w-[300px] p-2 rounded-lg outline-none border-[2px] border-sky-500' />
        </div>
        <div className='flex flex-col mt- gap-2 mt-2'>
          <h1 className='font-bold'>Description</h1>
          <Textarea onChange={(e) => setNotes({ ...notes, description: e.target.value })} placeholder='description' width={300} outlineColor='skyblue' />
        </div>
      </div>
      <div className='mt-[-40px] flex justify-end w-[300px]'>
        <Button colorScheme='purple' type='submit'>Create</Button>
      </div>
    </form>
  )
}

export default CreateNotes