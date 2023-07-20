import { useEffect, useState } from "react";

function Home() {
    const [data,setData] = useState('');
    console.log(data);
    useEffect(()=>{
        fetch('http://localhost:5001/api/v1/books')
        .then((res)=>res.json())
        .then((data)=>setData(data));
    },[]);
    return (
        <div className="w-9/12 mx-auto bg-slate-500">
            <h2 className="p-5">Recently Added Books</h2>
            <div className="">

            </div>
        </div>
    )
}

export default Home;