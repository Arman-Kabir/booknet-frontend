import { IBook } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/api/apiSlice";
import BookCard from "../components/BookCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { app } from "@/firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const auth = getAuth(app);

function AllBooks() {
  const [inputValue, setInputValue] = useState<string>('');
  console.log(inputValue);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const { data, refetch, isLoading, error } = useGetBooksQuery(undefined);
  console.log(data);

  const handleRefetch = () => {
    refetch();
  };
  // handleRefetch();

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    // return <div>Error:{error}</div>
  }
  let books = data as IBook[];

  const searchKey = (event: FormEvent<HTMLFormElement>) => {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  }

  if (inputValue) {

    books = books.filter((book) => (
      book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.author.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.genre.toLowerCase().includes(inputValue.toLowerCase())
    ))

    console.log(books);
  }

  const handleAddNewBook = () => {
    if(user){
      navigate('/addnew-book');
    }else{
      navigate("/signin")
      toast("Sign In First to Add New book")
    }
  }

  return (
    <div>
      <div className="">
        <div className="flex justify-center">
          <input className="border-2 w-1/3 p-2 rounded-lg" type="text" name="" id="" onKeyUp={searchKey} />
          <span className="p-3 bg-indigo-300 rounded-lg">Search</span>
        </div>
        <Button onClick={handleAddNewBook}>
          Add New Book
        </Button>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
        {/* ALl Books */}
        {books?.map((book: IBook) => (
          // console.log(book);
          <BookCard book={book} key={book._id}></BookCard>
        ))}
      </div>
    </div>
  )
}

export default AllBooks;