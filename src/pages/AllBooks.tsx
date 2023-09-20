import { IBook } from "@/types/globalTypes";
import { useGetBooksQuery } from "@/redux/api/apiSlice";
import BookCard from "../components/BookCard";

 function AllBooks() {
  const {data,isLoading,error} = useGetBooksQuery(undefined);

  if(isLoading){
    return <p>Loading...</p>
  }
  if(error){
    // return <div>Error:{error}</div>
  }
  // console.log(books);
  // console.log(data,isLoading,error);
  const books = data?.data as IBook[];
  // console.log(data.data);

  return (
    <div>
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