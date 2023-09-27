
import { usePostBookMutation } from "@/redux/api/apiSlice"
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormInput {
    title: string
    author: string
    genre: string
    publication_date: string
}

const AddNewBook = () => {
    const [postBook, { isLoading, isError, isSuccess }] = usePostBookMutation();

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const result = await postBook(data);
        console.log(result);
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-bold pb-5">Add New Book</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="space-y-5 grid grid-cols-2">

                    <div className="flex  items-center">
                        <p className="text-xl font-semibold text-indigo-500">Title</p>
                        <input className="border-2 w-1/2 block mx-auto" {...register("title", { required: true })} />
                    </div>

                    <div className="flex  items-center">
                        <p className="text-xl font-semibold text-indigo-500">Author</p>
                        <input className="border-2 w-1/2 block mx-auto" {...register("author", { required: true })} />
                    </div>

                    <div className="flex  items-center">
                        <p className="text-xl font-semibold text-indigo-500">Genre</p>
                        <input className="border-2 w-1/2 block mx-auto"  {...register("genre", { required: true })} />
                    </div>

                    <div className="flex  items-center">
                        <p className="text-xl font-semibold text-indigo-500">Publication Date</p>
                        <input className="border-2 w-1/2 block mx-auto" type="number" {...register("publication_date", { required: true })} />
                    </div>
                </div>


                <input className="hover:text-white border-2 block mx-auto my-5 bg-indigo-200 px-5 py-1 shadow-lg rounded-lg hover:bg-indigo-700 focus:ring-2" type="submit" />

            </form>
        </div>
    )
}

export default AddNewBook;