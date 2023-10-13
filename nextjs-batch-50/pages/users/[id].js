import React from 'react'
import dynamic from 'next/dynamic'

const DetailUsersIC = dynamic(() => import('@/components/DetailUsers'), {
  loading: () => <p className='text-4xl'>Loading....</p>,
})
const DetailUser = () => {

  return (
    <div className='flex bg-login justify-center items-center h-screen'>
      <DetailUsersIC />
    </div>
  )
}

export default DetailUser