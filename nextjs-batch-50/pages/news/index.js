import AllNews from '@/components/AllNews'
import HeaderNews from '@/components/HeaderNews'
import React, { useEffect, useState } from 'react'

const News = () => {
  const baseUrl = 'https://paace-f178cafcae7b.nevacloud.io/api'
  const [news, setNews] = useState()
  const getAllNews = async () => {
    const res = (await fetch(`${baseUrl}/notes`)).json()
    return res
  }

  useEffect(() => {
    getAllNews().then((ress) => setNews(ress))
  }, [])

  const ress = news?.data
  return (
    <>
      <HeaderNews add={false} />
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