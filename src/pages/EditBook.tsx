import { useEditBookMutation, useGetSingleBookQuery } from "@/redux/api/apiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom"

interface IFormInput {
  id?: string,
  title: string,
  author: string,
  genre: string,
  publication_date: string,
  added_by: string,
  image?: string
}


const EditBook = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm<IFormInput>();

  const { data, isLoading } = useGetSingleBookQuery(id);
  const [EditBook] = useEditBookMutation();

  if (isLoading) {
    return <div className="bg-zinc-500">Loading...</div>
  }


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    // console.log(user?.email);
    // data.added_by = user?.email;
    const options={
      id:id,
      data:data
    }
    console.log(options);
    const result = await EditBook(options);
    console.log(result);
  };

  console.log(data);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold pb-5">Edit Book</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="space-y-5 grid grid-cols-2">

          <div className="flex  items-center">
            <p className="text-xl font-semibold text-indigo-500">Title</p>
            <input placeholder={data?.title} className="border-2 w-1/2 block mx-auto" {...register("title", { required: true })} />
          </div>

          <div className="flex  items-center">
            <p className="text-xl font-semibold text-indigo-500">Author</p>
            <input placeholder={data?.author} className="border-2 w-1/2 block mx-auto" {...register("author", { required: true })} />
          </div>

          <div className="flex  items-center">
            <p className="text-xl font-semibold text-indigo-500">Genre</p>
            <input placeholder={data?.genre} className="border-2 w-1/2 block mx-auto"  {...register("genre", { required: true })} />
          </div>
          <div className="flex  items-center">
            <p className="text-xl font-semibold text-indigo-500">Image Url</p>
            <input placeholder={data?.image} className="border-2 w-1/2 block mx-auto"  {...register("image", { required: true })} />
          </div>

          <div className="flex  items-center">
            <p className="text-xl font-semibold text-indigo-500">Publication Date</p>
            <input placeholder={data?.publication_date} className="border-2 w-1/2 block mx-auto" type="number" {...register("publication_date", { required: true })} />
          </div>
        </div>


        <input className="hover:text-white border-2 block mx-auto my-5 bg-indigo-200 px-5 py-1 shadow-lg rounded-lg hover:bg-indigo-700 focus:ring-2" type="submit" />

      </form>
    </div>
  )
}

export default EditBook