import { IBook } from "@/types/globalTypes";
import { Card, CardContent, CardHeader, } from "./ui/card";
import { Link } from "react-router-dom";

interface IProps {
    book: IBook
}

const BookCard = ({ book }: IProps) => {
    // console.log(book);
    return (
        <Card className="">

            <Link to={`/book-details/${book._id}`}>
                <div className="aspect-w-7 aspect-h-6">
                    <img className="object-fit shadow-lg hover:shadow-blue-300 rounded-lg" src={book?.image} alt="" height={200} />
                </div>
                <CardHeader className="text-center py-1">{book.title}</CardHeader>
            </Link>

            <p className="text-center text-slate-400">By <span>{book?.author}</span></p>

            <CardContent className="flex justify-around">
                <p>{book.genre}</p>
                <p>{book.publication_date}</p>
            </CardContent>

        </Card>
    )
}

export default BookCard;