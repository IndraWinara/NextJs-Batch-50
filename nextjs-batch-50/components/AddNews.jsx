import { useMutation } from "@/hooks/useMutation";
import { sendRequest } from "@/utils/mutateSwr";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWRMutation from 'swr/mutation'

const AddNews = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dataInput = { title, description }
  const { mutate } = useMutation()
  async function sendRequest(url, { arg }) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }
  const { trigger } = useSWRMutation("https://paace-f178cafcae7b.nevacloud.io/api/notes", sendRequest)


  const HandleSubmit = async (e) => {
    e.preventDefault()

    //SWR mutation


    console.log('testdata', await trigger({ arg: dataInput }))





  };

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
        <button type="submit" className="p-2 bg-sky-500 rounded">Create News</button>
      </form>
    </>
  )
}

export default AddNews