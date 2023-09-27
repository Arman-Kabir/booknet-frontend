
const provider = new GoogleAuthProvider();
import { app } from "@/firebase-config";
import { getAuth, onAuthStateChanged,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, NavLink, Navigate, redirect, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const navigate = useNavigate();

    const auth = getAuth(app);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleButton = async () => {
        console.log('hello');
        const result = await signInWithGoogle();
        if(result){
            navigate(-1);
        }
       
    }
    return (
        <div className="flex justify-center items-center h-80">
            <button onClick={() => handleButton()} className="border px-7 py-2 rounded-lg bg-blue-300">Login Using Google</button>
        </div>
    )
}

export default Login