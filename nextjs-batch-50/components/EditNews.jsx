import { useMutation } from '@/hooks/useMutation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const EditNews = ({ data }) => {
  const [title, setTitle] = useState(data.data.title)
  const [description, setDescription] = useState(data.data.description)
  const dataUpdate = { title, description }
  const router = useRouter()
  const { id } = router.query
  const { mutate } = useMutation()
  const HandleSubmit = async (e) => {
    e.preventDefault()

    const result = await mutate({ url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`, method: "PATCH", payload: { title, description } })
    if (result?.success) {
      router.push("/news");
    }


    //   try {
    //     const response = await fetch(
    //       `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
    //       {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(dataUpdate),
    //       }
    //     );
    //     const result = await response.json();
    //     if (result?.success) {
    //       router.push("/news");
    //     }
    //   } catch (error) { console.log(error) }
  }
  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input className="p-2 bg-indigo-500/10" placeholder="title" type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)} />
        </div>
        <div className="flex flex-col">
          <label>description</label>
          <input className="p-2 bg-indigo-500/10" placeholder="title"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)} />
        </div>
        <button type="submit" className="p-2 bg-sky-500 rounded">Update</button>
      </form>
    </>
  )
}

export default EditNews


