import { IBook } from "@/types/globalTypes";
import { Card, CardContent, CardHeader, } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { addToWishlist } from "@/redux/features/wishlist/listSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToReading, finishReading } from "@/redux/features/reading/readingSlice";

interface IProps {
    book: IBook
}

const BookCard = ({ book }: IProps) => {
    const { books: wishlist_books, total: wishlist_total } = useAppSelector((state) => state.list);
    const { books: reading_books, total: reading_total } = useAppSelector((state) => state.reading);
    const dispatch = useAppDispatch();
    // console.log(book);

    console.log(wishlist_books, wishlist_total);
    console.log(reading_books, reading_total);

    const handleAddToWishlist = (book: IBook) => {
        dispatch(addToWishlist(book));
    }

    const handleAddToReadinglist = (book: IBook) => {
        dispatch(addToReading(book));
    }

    const markFinishReading = (book: IBook) => {
        dispatch(finishReading(book));
    }
    return (
        <Card className="">

            <Link to={`/book-details/${book._id}`}>
                <div className="aspect-w-7 aspect-h-6">
                    <img className="object-fit shadow-lg hover:shadow-blue-300 rounded-lg" src={book?.image} alt="" height={200} />
                </div>
                <CardHeader className="text-center py-1">{book.title}</CardHeader>
            </Link>

            <p className="text-center text-slate-400">By <span>{book?.author}</span></p>

            <CardContent className="flex space-x-2 items-center">
                <p>{book.genre}</p>
                <p>{book.publication_date}</p>


            </CardContent>
            <div className="flex justify-around ">
                {
                    wishlist_books.find((w_book) => w_book._id === book._id) ? (
                        <Button className="text-red-300 px-2">
                            Wishlisted
                        </Button>
                    ) : (
                        <Button onClick={() => handleAddToWishlist(book)} className="text-red-300 px-0">
                            Add to wishlist
                        </Button>
                    )
                }
                {
                    reading_books.find((r_book) => r_book._id === book._id) ?

                        reading_books.find((r_book) => r_book._id === book._id && r_book.finished) ?
                            (
                                <Button className="text-red-300 px-2">
                                    Finished
                                </Button>
                            )
                            :
                            (
                                <Button onClick={() => markFinishReading(book)} className="text-red-300 px-0">
                                    Mark Finish Reading
                                </Button>
                            )

                        :
                        <Button onClick={() => handleAddToReadinglist(book)} className="text-red-300 px-0">
                            Add to Readinglist
                        </Button>
                }
               
            </div>

        </Card>
    )
}

export default BookCard;