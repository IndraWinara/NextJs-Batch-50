import React from 'react'
import dynamic from 'next/dynamic'
const MainIC = dynamic(() => import('./HeroSection/Main'), {
  loading: () => <p className='text-sm'>Loading....</p>,
})

const Hero = () => {
  return (
    <div className='bg-slate-300 w-full h-[2100px] py-[60px] px-[250px] bg-image'>
      <MainIC />
      <MainIC />
      <MainIC />
      <MainIC />
      <MainIC />
    </div>
  )
}

export default Hero