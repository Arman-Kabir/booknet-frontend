
function AllBooks() {

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 pt-6">
        {booksData?.map((book: IBook) => (
          <BookCard key={book._id} book={book}></BookCard>
        ))}
      </div>
    </div>
  )
}

export default AllBooks;