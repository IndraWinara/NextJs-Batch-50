import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useState } from "react";

const AddNews = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dataInput = { title, description }
  const { mutate } = useMutation()
  const HandleSubmit = async (e) => {
    e.preventDefault()
    //custom hooks
    const result = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/notes", payload: { title, description } })
    if (result?.success) {
      router.push("/news");
    }


    // manual fetch

    // try {
    //   const response = await fetch(
    //     "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );
    //   const result = await response.json();
    //   if (result?.success) {
    //     router.push("/news");
    //   }
    // } catch (error) { console.log(error) }
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