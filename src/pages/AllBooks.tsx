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
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider"

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
    if (user) {
      navigate('/addnew-book');
    } else {
      navigate("/signin")
      toast("Sign In First to Add New book")
    }
  }
  const handleSlider = (value: number[]) => {
    // dispatch(setPriceRange(value[0]));
    console.log(value);
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-center items-center space-x-6">
          <div>
            <input className="border-2 w-[200px] p-2 rounded-lg" type="text" name="" id="" onKeyUp={searchKey} />
            <span className="p-3 bg-indigo-300 rounded-lg">Search</span>
          </div>
          <div className="w-[50px]">
            <Switch></Switch>
          </div>
          <div className="w-[100px]">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {/*priceRange*/}$</div>

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