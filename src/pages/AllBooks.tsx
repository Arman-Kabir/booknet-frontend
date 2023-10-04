import { IBook } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/api/apiSlice";
import BookCard from "../components/BookCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { app } from "@/firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Slider } from "@/components/ui/slider"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setYearRange } from "@/redux/features/books/bookSlice";
import SelectComponent from "@/components/SelectComponent";

const auth = getAuth(app);

function AllBooks() {
  const [inputValue, setInputValue] = useState<string | null>('');

  const { yearRange, genre } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  // console.log(inputValue);
  console.log(yearRange, genre);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data, refetch, isLoading } = useGetBooksQuery(undefined);
  // console.log(data);

  if (isLoading) {
    return <p>Loading...</p>
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

    // console.log(books);
  }

  const handleAddNewBook = () => {
    if (user) {
      navigate('/addnew-book');
    } else {
      navigate("/signin")
      toast("Sign In First to Add New book")
    }
  }
  const handleSlider = (value: number[]) => {
    dispatch(setYearRange(value[0]));
    console.log(value);
  };

  if (data) {
    if (status) {
      books = books.filter(
        (item) =>
          // console.log(item)
          status === true && item.publication_date < yearRange
      );
    } else if (yearRange > 0) {
      books = books.filter(
        (item: { publication_date: number }) => item.publication_date < yearRange
      );
    }
  }

  if (genre) {
    books = books?.filter((item) =>
      item.genre === genre
    );
  }

  return (
    <div>
      <div className="">
        <div className="flex justify-center items-center space-x-6">
          <div>
            <input className="border-2 w-[200px] p-2 rounded-lg" placeholder="title,author, genre....." type="text" name="" id="" onChange={searchKey} />
            <span className="p-3 bg-indigo-300 rounded-lg">Search</span>
          </div>

          <div>
            <SelectComponent></SelectComponent>
          </div>

          <div className="w-[100px]">
            <Slider
              defaultValue={[2016]}
              max={2018}
              min={2002}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 2002 To {yearRange}</div>

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