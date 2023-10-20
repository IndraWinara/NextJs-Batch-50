import ContactAll from '@/components/ContactAll'
import React from 'react'


const AllContacts = ({ resJson }) => {

  return (
    <div className='flex bg-login justify-center items-center h-screen' >
      <ContactAll data={resJson} />
    </div>
  )
}

export default AllContacts

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const resJson = await res.json()
  return { props: { resJson } }
}