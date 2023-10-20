import { useMutation } from '@/hooks/useMutation'
import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const AllNews = ({ data }) => {
  const router = useRouter()
  const { mutate } = useMutation()
  const handleDelete = async (id) => {

    const result = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`, method: "DELETE" })
    if (result?.success) {
      router.reload();
    }

    // try {
    //   const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //   const result = await response.json();
    //   if (result?.success) {
    //     router.reload();
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

  }
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      className='flex flex-col p-2 bg-sky-500 gap-2 rounded-lg'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
        className='w-[300px] h-[300px] rounded'
      />

      <Stack>
        <CardBody>
          <Heading size='md' className='text-xl font-bold'>{data.title}</Heading>

          <Text py='2' className='w-[300px] text-[14px]'>
            {data.description}
          </Text>
        </CardBody>
        <div className='flex justify-between'>
          <button onClick={() => router.push(`/news/${data.id}`)} className='p-1 rounded-lg bg-indigo-500'>update</button>
          <button onClick={() => handleDelete(data.id)} className='p-1 rounded-lg bg-red-500'>delete</button>
        </div>
      </Stack>
    </Card>
  )
}

export default AllNews