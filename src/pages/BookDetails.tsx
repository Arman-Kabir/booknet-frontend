import { Button } from "@/components/ui/button";
import { useGetSingleBookQuery, usePostCommentMutation } from "@/redux/api/apiSlice";
import { IBook } from "@/types/globalTypes";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput{
  review:string
}

const BookDetails = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { id } = useParams();
  
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [postComment] = usePostCommentMutation();
  

  if (isLoading) {
    return <div className="bg-zinc-500">Loading...</div>
  }
  const book = data;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
    // console.log(user?.email);
    // data.added_by = user?.email;
    const options={
      id:id,
      data:data
    }
    console.log(options);
    const result = await postComment(options);
    console.log(result);
  };

  

  return (
    <div className="flex max-w-6xl bg-slate-500 h-screen mx-auto">

      <div className="w-1/2  aspect-w-5 aspect-h-2">
        <img className="object-fit shadow-lg hover:shadow-blue-300 rounded-lg" src={book.image} alt="" height={200} />
      </div>

      <div className="w-1/2 text-center space-y-4">
        <p className="text-3xl  font-bold">{book?.title}</p>
        <p className=" text-slate-400">Written By <span>{book?.author}</span></p>
        <p>Genre:{book?.genre}</p>
        <p>Publication Date{book?.publication_date}</p>

        <div>
          <p className="text-2xl font-bold">Reviews</p>
          {book?.reviews?.map((review, index) => (
            <p key={index} className="text-xl text-blue-400">
              {review}
            </p>
          ))}
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

              <input placeholder='comment' className="border-2 w-1/2 block mx-auto" {...register("review")} />
           
            <input className="hover:text-white border-2 block mx-auto my-5 bg-indigo-200 px-5 py-1 shadow-lg rounded-lg hover:bg-indigo-700 focus:ring-2" type="submit" />
          </form>
        </div>
        <div>
          <Link to={`/edit-book/${book?._id}`}> <Button variant="outline" className="text-black">Edit Book</Button>
          </Link>
          <Link to={`/login`}> <Button variant="outline" className="text-black">Delete Book</Button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default BookDetails