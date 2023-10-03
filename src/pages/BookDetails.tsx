import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetSingleBookQuery, usePostCommentMutation } from "@/redux/api/apiSlice";
import { IBook } from "@/types/globalTypes";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteConfirmationDialog from "./DeleteConfirm";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase-config";

const auth = getAuth(app);

interface IFormInput {
  review: string
}

const BookDetails = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [user, loading, error] = useAuthState(auth);


  const { register, handleSubmit } = useForm<IFormInput>();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleBookQuery(id);
  const [postComment] = usePostCommentMutation();
  const [deleteBook] = useDeleteBookMutation();
  if (isLoading) {
    return <div className="bg-zinc-500">Loading...</div>
  }
  const book = data;
  // console.log(book);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const options = {
      id: id,
      data: data
    }
    console.log(options);
    const result = await postComment(options);
    console.log(result);
  };

  const handleDeleteClick = () => {
    setDialogVisible(true);
  };

  const handleCancelClick = () => {
    setDialogVisible(false);
  };

  const handleConfirmDelete = async () => {
    // console.log(id);
    if (user?.email == book?.added_by) {
      const result = await deleteBook(id);
      console.log(result);
      if (result) {
        toast("Book deleted successfully");
        navigate("/all-books");
      }
    } else {
      toast("U can't delete cz u didn't add this book")
    }
    setDialogVisible(false);
  };

  const handleEditBook = () => {
    if (user?.email == book?.added_by) {
      navigate(`/edit-book/${book?._id}`);
    } else {
      toast("U can't edit cz u didn't add this book")
    }
  }

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

        <div className=" flex justify-center space-x-3">
          {
            user && (
              <div>
                <Button onClick={handleEditBook} variant="outline" className="text-black">Edit Book</Button>

                <div>
                  <Button onClick={handleDeleteClick} variant="destructive" className="text-black">Delete Book</Button>

                  <DeleteConfirmationDialog
                    show={isDialogVisible}
                    onCancel={handleCancelClick}
                    onConfirm={handleConfirmDelete}
                  />
                </div>
              </div>
            )
          }
        </div>


      </div>

    </div>
  )
}

export default BookDetails