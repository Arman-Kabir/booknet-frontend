import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="w-full px-20 bg-neutral-950 text-white h-16 flex justify-between">
            <div className="flex items-center">
                <h1 className="font-bold text-3xl text-purple-600 ">Book-Net</h1>
            </div>
            <div className="flex items-center	">
                <ul className="flex">
                    <li className="pr-5"> <Link to='/'>Home</Link> </li>
                    <li> <Link to='/books'>books</Link> </li>
                </ul>                
            </div>
            <div className="flex items-center	">
                <Button variant="outline" className="text-black">Login</Button>
            </div>
            
        </div>
    )
}

