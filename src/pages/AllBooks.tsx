import { IBook } from "@/types/globalTypes";
import SingleBook from "../components/SingleBook";
import { useGetBooksQuery } from "@/redux/api/apiSlice";

function AllBooks() {
  const {data,isLoading,error} = useGetBooksQuery(undefined);
  // console.log(books);
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
        ALl Books
        {/* {books?.map((book: IBook) => (
          // console.log(book);
          <SingleBook book={book} key={book._id}></SingleBook>
        ))} */}
      </div>
    </div>
  )
}

export default AllBooks;