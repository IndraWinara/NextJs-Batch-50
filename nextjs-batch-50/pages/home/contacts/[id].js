import DetailContact from '@/components/DetailContact'
import React from 'react'

const Detail = ({ resJson }) => {

  return (
    <div className='flex bg-login justify-center items-center h-screen' >
      <DetailContact data={resJson} />
    </div>
  )
}

export default Detail


export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const resJson = await res.json()

  const paths = resJson.map((res) => ({
    params: {
      id: res.id.toString()
    }
  }))
  return {
    paths,
    fallback: false, // false or "blocking"
  }
}

export async function getStaticProps(context) {
  const { id } = context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const resJson = await res.json()
  return { props: { resJson }, revalidate: 5 }
}