
import { app } from "@/firebase-config";
import { usePostBookMutation } from "@/redux/api/apiSlice"
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const auth = getAuth(app);

interface IFormInput {
    
    title: string,
    author: string,
    genre: string,
    publication_date: string,
    added_by:string,
    image?:string
}

const AddNewBook = () => {
    const [postBook, { isLoading, isError, isSuccess }] = usePostBookMutation();

    const [user, loading, error] = useAuthState(auth);

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // console.log(data);
        // console.log(user?.email);
        data.added_by = user?.email;
        // console.log(data);
        const result = await postBook(data);
        if(result.data.result.insertedId){
            toast("book inserted successfully")
        }else{
            "book Not inserted"
        }
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
                        <p className="text-xl font-semibold text-indigo-500">Image Url</p>
                        <input className="border-2 w-1/2 block mx-auto"  {...register("image", { required: true })} />
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