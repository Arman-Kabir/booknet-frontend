
import { app } from "@/firebase-config";
import { usePostBookMutation } from "@/redux/api/apiSlice"
import { getAuth } from "firebase/auth";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app);

interface IFormInput {
    email: string,
    password: string,
}

const SignUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        
        const result = await createUserWithEmailAndPassword(data.email,data.password);
        if(result?.user.email){
            toast("User created successfullt! Now Login");
            navigate('/signin');
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

export default SignUp