
const provider = new GoogleAuthProvider();
import { app } from "@/firebase-config";
import { getAuth, onAuthStateChanged,  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, NavLink, Navigate, redirect, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const auth = getAuth(app);
interface IFormInput {
    email: string,
    password: string,
}

const SignIn = () => {
    const navigate = useNavigate();
    // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        
        const result = await signInWithEmailAndPassword(data.email,data.password);
        if(result?.user.email){
            toast("User Signin in successfully");
            navigate('/');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="h-2/6 flex flex-col items-center justify-center">
                    <div className="max-w-2xl mx-auto ">

                        <div className="flex  items-center space-x-2">
                            <p className="text-xl font-semibold text-indigo-500 w-[100px]">Email</p>
                            <input className="border-2 w-1/2 block mx-auto" {...register("email", { required: true })} />
                        </div>

                        <div className="flex  items-center space-x-2">
                            <p className="text-xl font-semibold text-indigo-500 w-[100px]">Password</p>
                            <input className="border-2 w-1/2 block mx-auto" {...register("password", { required: true })} />
                        </div>

                    </div>

                    <input className="hover:text-white border-2 block mx-auto my-5 bg-indigo-200 px-5 py-1 shadow-lg rounded-lg hover:bg-indigo-700 focus:ring-2" type="submit" />
                </div>

            </form>
        </>
    )
}

export default SignIn;