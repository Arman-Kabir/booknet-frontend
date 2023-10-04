

import { setGenre } from "@/redux/features/books/bookSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    genre: string,
}

const SelectComponent = () => {
    // const { genre } = useAppSelector((state) => state.book);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<IFormInput>();
    // console.log("genre",genre);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        dispatch(setGenre(data.genre));
        // console.log(onGenreSelect);

    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <select  {...register("genre")}>
                    <option value="">Select Genre</option>
                    <option value="non-fiction">non-fiction</option>
                    <option value="academic">academic</option>
                    <option value="Romance novel">Romance novel</option>
                    <option value="biography">biography</option>
                    <option value="art">art</option>
                    <option value="religion">religion</option>
                    <option value="nutrition">nutrition</option>
                    <option value="law">law</option>
                    <option value="novel">novel</option>
                    <option value="literature">literature</option>
                    <option value="self-improvement">self-improvement</option>
                </select>

                <input className="hover:text-white border-2 block mx-auto my-5 bg-indigo-200 px-5 py-1 shadow-lg rounded-lg hover:bg-indigo-700 focus:ring-2" value="submit-genre" type="submit" ></input>

              
            </form>

        </div>
    )
}

export default SelectComponent