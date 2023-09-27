import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase-config";

export default function Navbar() {
    const auth = getAuth(app);
    onAuthStateChanged(auth,(user)=>{
        console.log(user);
    });

    return (
        <div className="w-full px-20 bg-neutral-950 text-white h-16 flex justify-between">
            <div className="flex items-center">
                <h1 className="font-bold text-3xl text-purple-600 ">Book-Net</h1>
            </div>
            <div className="flex items-center	">
                <ul className="flex">
                    <li className="pr-5"> <Link to='/'>Home</Link> </li>
                    <li> <Link to='/all-books'>All books</Link> </li>
                </ul>                
            </div>
            <div className="flex items-center	">
                <Link to={'/login'}><Button variant="outline" className="text-black">Login</Button></Link>
            </div>
            
        </div>
    )
}

