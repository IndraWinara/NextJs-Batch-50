import EditNews from '@/components/EditNews'
import HeaderNews from '@/components/HeaderNews'
import React from 'react'

const Edit = ({ resJson }) => {

  return (
    <div>
      <HeaderNews add={true} />
      <EditNews data={resJson} />
    </div>
  )
}

export default Edit

export async function getStaticPaths() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  const resJson = await res.json()

  const paths = resJson.data.map((res) => ({
    params: {
      id: res.id.toString()
    }
  }))
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps(context) {
  const { id } = context.params
  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`)
  const resJson = await res.json()
  return { props: { resJson }, revalidate: 5 }
}