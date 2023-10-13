import Layout from '@/Layout'
import dynamic from 'next/dynamic'
import React from 'react'
const HeroIC = dynamic(() => import('@/components/Hero'), {
  loading: () => <p className='text-4xl'>Loading....</p>,
})

const HomeScreen = () => {
  return (
    <Layout>
      <HeroIC />
    </Layout>
  )
}

export default HomeScreen