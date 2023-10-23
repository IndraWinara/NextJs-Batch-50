import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { loginImage } from '../../public/gambar.png'
import Image from 'next/image'
import Cookies from 'js-cookie'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const fakeToken = "19238910hsdbsbcjdsbcjjhsdhjdsbf"
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '' && password === '') {
      alert('fill the password and email')
      return
    }
    Cookies.set('token', fakeToken, { expires: 3 })
    router.push('/home')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='h-screen bg-login flex justify-center items-center flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Welcome to Our best ChatBot App</h1>
      <div className='bg-sky-500 p-5 gap-5 flex justify-between h-[400px] w-[600px] rounded-xl  '>
        <div className='w-[400px]'>
          <Image src='https://i0.wp.com/www.techquintal.com/wp-content/uploads/2022/07/Virtual-Memory.jpg?resize=768%2C432&ssl=1' className='h-full object-cover rounded-full' alt='login image' width={400} height={400} />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex'>
          <FormControl isRequired className='flex flex-col justify-around'>
            <div>
              <FormLabel>Email address</FormLabel>
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <FormHelperText>We'll never share your email.</FormHelperText>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className=''>
              <Button type="submit" className='w-full'>Login</Button>
            </div>
            <p className='text-end text-[13px]'>Not Registered yet? <span className='cursor-pointer hover:underline'>Sign Up</span></p>
          </FormControl>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen