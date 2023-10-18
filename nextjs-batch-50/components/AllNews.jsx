import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const AllNews = ({ data }) => {

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
      </Stack>
    </Card>
  )
}

export default AllNews