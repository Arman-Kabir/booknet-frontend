/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BookCard from "@/components/BookCard";
import { IBook } from "@/types/globalTypes";
import { useEffect, useState, } from "react";
import { useGetBooksQuery } from "@/redux/api/apiSlice";

function Home() {
    const [recentBooks, setRecentBooks] = useState<IBook[]>([]);
    const { data, refetch, isLoading, error } = useGetBooksQuery(undefined);
    console.log(data);

    const handleRefetch =async () => {
        await refetch();
    };
    useEffect(() => {
        void handleRefetch();
        if (data) {
            setRecentBooks(data?.slice(-10).reverse());
        }
        // console.log(recentBooks);
    }, [data]);


    // const recentBooks = data.slice(-10).reverse();
    // console.log(recentBooks);

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="p-5 text-center text-4xl text-purple-600 font-black">Recently Added Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {
                    recentBooks?.map((book: IBook) => (
                        <BookCard key={book._id} book={book}></BookCard>
                    ))
              }
            </div>
        </div>
    )
}

export default Home;