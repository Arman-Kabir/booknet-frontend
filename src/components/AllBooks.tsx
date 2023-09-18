import { IBook } from "@/types/globalTypes";
import SingleBook from "./SingleBook";

function AllBooks({ books }) {
  // console.log(books);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
        {books?.map((book: IBook) => (
          // console.log(book);
          <SingleBook book={book} key={book._id}></SingleBook>
        ))}
      </div>
    </div>
  )
}

export default AllBooks;