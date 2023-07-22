import { IBook } from "@/types/globalTypes";

interface IProps {
    book: IBook;
}

function BookCard({ book }: IProps) {
    console.log(book);
    return (
        <div>
            {/* flex flex-col items-center */}
            <div className="p-5">
                
                <div className="">
                {/* bookCard-image */}
                    <img className="h-96 w-full" src={book.image} alt="" />
                </div>
                <h3 className="text-2xl font-bold text-center text-purple-600 pt-3">{book.title}</h3>
                <p className="text-purple-400 text-center text-xl">Written By : {book.author}</p>

                <div className="flex justify-around text-xl text-purple-400">                    
                    <p className="">{book.genre}</p>
                    <p className="">{book.publication_date}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCard;