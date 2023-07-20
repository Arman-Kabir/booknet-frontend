import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useEffect, useState } from "react";

function Home() {
    const [data,setData] = useState<IBook[]>([]);
    console.log(data);
    let booksData;

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
        <div className="w-9/12 mx-auto bg-slate-500">
            <h2 className="p-5">Recently Added Books</h2>
            <div className="">
                {booksData?.map((book:IBook)=>(
                    <BookCard  key = {book._id} book={book}></BookCard>
                ))}
            </div>
        </div>
    )
}

export default Home;