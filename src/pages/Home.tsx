/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import AllBooks from "@/components/AllBooks";
import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useEffect, useState } from "react";

function Home() {
    const [data, setData] = useState<IBook[]>([]);
    // console.log(data);
    const booksData = data?.data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    
    // console.log(booksData);


    useEffect(() => {
        fetch('http://localhost:5001/api/v1/books')
            .then((res) => res.json())
            .then((data: IBook[]) => setData(data))
            .catch((error) => {
                console.log('Error fetching data', error)
            })
    }, []);

    return (
        <div className="w-9/12 mx-auto">
            <h2 className="p-5 text-center text-4xl text-purple-600 font-black">Recently Added Books</h2>
            <AllBooks books={booksData}></AllBooks>
        </div>
    )
}

export default Home;