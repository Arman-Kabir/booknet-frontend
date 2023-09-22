import { IBook } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/api/apiSlice";
import BookCard from "../components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";

function AllBooks() {
  const [inputValue,setInputValue] = useState<string>('');
  console.log(inputValue);
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    // return <div>Error:{error}</div>
  }
  let books = data?.data as IBook[];

  const searchKey = (event: FormEvent<HTMLFormElement>) => {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  }

  if(inputValue){
    
    books = books.filter((book)=>(
      book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.author.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.genre.toLowerCase().includes(inputValue.toLowerCase())
    ))

    console.log(books);
  }

  return (
    <div>
      <div className="">
        <div className="flex justify-center">
          <input className="border-2 w-1/3 p-2 rounded-lg" type="text" name="" id="" onKeyUp={searchKey} />
          <span className="p-3 bg-indigo-300 rounded-lg">Search</span>
        </div>
        <Button>
          <Link to={'/addnew-book'}>Add New Book</Link>
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