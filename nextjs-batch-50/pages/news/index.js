import AllNews from '@/components/AllNews'
import HeaderNews from '@/components/HeaderNews'
import { useQueries } from '@/hooks/useQueries'
import React, { useEffect, useState } from 'react'

const News = () => {
  const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api'
  const { data } = useQueries({ prefixUrl: `${baseUrl}/notes` })
  console.log("custom", data)

  // const [news, setNews] = useState()
  // const getAllNews = async () => {
  //   const res = (await fetch(`${baseUrl}/notes`)).json()
  //   return res
  // }

  // useEffect(() => {
  //   getAllNews().then((ress) => setNews(ress))
  // }, [])

  const ress = data?.data
  return (
    <>
      <HeaderNews add={false} home={true} />
      <div className='flex gap-2  flex-wrap justify-center'>
        {
          ress?.map((item, index) => (
            <div key={index}>
              <AllNews data={item} />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default News