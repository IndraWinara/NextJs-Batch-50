import { Button, Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const EditNotes = ({ onClose, data }) => {
  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)
  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/notes/${data?.id}`, {
      method: "PATCH", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({ title, description })
    })
    router.push('/')
    onClose()
  }

  return (
    <form className='p-2 h-[500px] w-[500px] ' onSubmit={handleDelete} >
      <div className='h-full w-[350px]' >
        <div className='flex flex-col'>
          <label className='font-bold'>Title</label>
          <input value={title}
            onChange={(event) =>
              setTitle(event.target.value)} placeholder='title.....' type='text' className='w-[300px] p-2 rounded-lg outline-none border-[2px] border-sky-500' />
        </div>
        <div className='flex flex-col mt- gap-2 mt-2'>
          <h1 className='font-bold'>Description</h1>
          <Textarea value={description}
            onChange={(event) =>
              setDescription(event.target.value)} placeholder='description' width={300} outlineColor='skyblue' />
        </div>
      </div>
      <div className='mt-[-40px] flex justify-end w-[300px]'>
        <Button colorScheme='green' type='submit'>Edit</Button>
      </div>
    </form>
  )
}

export default EditNotes