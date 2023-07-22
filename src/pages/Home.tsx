/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useEffect, useState } from "react";

function Home() {
    const [data,setData] = useState<IBook[]>([]);
    console.log(data);
    let booksData;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    booksData=data?.data;
    

    useEffect(()=>{
        fetch('http://localhost:5001/api/v1/books')
        .then((res)=>res.json())
        .then((data:IBook[])=>setData(data))
        .catch((error)=>{
            console.log('Error fetching data',error)
        })
    },[]);

    return (
        <div className="w-9/12 mx-auto">
            <h2 className="p-5 text-center text-4xl text-purple-600 font-black">Recently Added Books</h2>
            <div className="grid grid-cols-4 gap-5 pt-6">
                {booksData?.map((book:IBook)=>(
                    <BookCard  key = {book._id} book={book}></BookCard>
                ))}
            </div>
        </div>
    )
}

export default Home;