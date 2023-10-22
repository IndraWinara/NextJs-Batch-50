import React from 'react'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'



const Card = ({ data }) => {
  return (
    <div className='border-t-[4px] border-sky-500 border-[1px] p-2 w-[250px] h-[300px] rounded-lg'>
      <div className='flex flex-col'>
        <div className='overflow-auto'>
          <p className='font-bold h-[40px] text-center '>{data?.title}</p>
        </div>
        <div className='overflow-auto h-[200px] text-[14px]'>
          <p>{data?.description}</p>
        </div>
        <div className='flex justify-between'>
          <ModalDelete data={data} />
          <ModalEdit data={data} />
        </div>
      </div>
    </div>
  )
}

export default Card