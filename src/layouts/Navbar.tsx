import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getAuth, } from "firebase/auth";
import { app } from "@/firebase-config";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';

const auth = getAuth(app);

export default function Navbar() {

    const [user, loading, error] = useAuthState(auth);

    const [signOut] = useSignOut(auth);
    console.log(user);


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
                {
                    user ?
                        <div className="flex space-x-2">
                            <Button onClick={() => signOut()} variant="outline" className="text-black">Logout</Button>

                            <Link to={`/addnew-book`}><Button variant="outline" className="text-black">Add New Book</Button></Link>
                        </div>
                        :
                        <Link to={`/login`}> <Button variant="outline" className="text-black">Login</Button>
                        </Link>
                }
            </div>

        </div >
    )
}

