import { IBook } from "@/types/globalTypes";
import { Card, CardContent, CardHeader, } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { addToWishlist } from "@/redux/features/wishlist/listSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { addToReading } from "@/redux/features/reading/readingSlice";

interface IProps {
    book: IBook
}

const BookCard = ({ book }: IProps) => {
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    console.log(book);

    const handleAddToWishlist = (book: IBook) => {
        dispatch(addToWishlist(book));
        // toast("book added to wishlist");
    }

    const handleAddToReadinglist = (book: IBook) => {
        dispatch(addToReading(book));
        // toast("book added to reading list");
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
                <Button onClick={() => handleAddToWishlist(book)} className="text-red-300 px-2">
                    Add to wishlist
                </Button>
                <Button onClick={() => handleAddToReadinglist(book)} className="text-red-300 px-2">
                    Add to Readinglist
                </Button>
            </div>

        </Card>
    )
}

export default BookCard;