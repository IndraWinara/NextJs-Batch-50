import { useRouter } from "next/router";
import { useState } from "react";

const AddNews = () => {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.push("/news");
      }
    } catch (error) { }
  };

  return (
    <div>
      <form>
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input className="p-2 bg-indigo-500/10" placeholder="title" type="text"
            onChange={(event) =>
              setNotes({ ...notes, title: event.target.value })} />
        </div>
        <div className="flex flex-col">
          <label>description</label>
          <input className="p-2 bg-indigo-500/10" placeholder="title"
            onChange={(event) =>
              setNotes({ ...notes, description: event.target.value })} />
        </div>
        <button className="p-2 bg-sky-500 rounded">Create News</button>
      </form>
    </div>
  )
}

export default AddNews