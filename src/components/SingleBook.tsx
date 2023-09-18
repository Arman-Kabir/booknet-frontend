import { Card } from "./ui/card";

const SingleBook = ({ book }) => {
    console.log(book);
    return (
        <Card className="w-[480] p-0">
            <div className="w-full h-[200]">
                <img className="" src={book?.image} alt="" height={200} />
            </div>

        </Card>
    )
}

export default SingleBook