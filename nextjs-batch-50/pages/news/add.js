import AddNews from '@/components/AddNews'
import HeaderNews from '@/components/HeaderNews'
import React from 'react'

const addNews = () => {
  return (
    <div>
      <HeaderNews add={true} />
      <AddNews />
    </div>
  )
}

export default addNews