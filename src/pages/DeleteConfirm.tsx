import { Button } from "@/components/ui/button";

const DeleteConfirmationDialog = ({ show, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="relative">
            <div className="bg-white rounded-lg px-5 w-[200px] mx-[-400px] py-2 my-[-200px] absolute shadow-lg ">
                <p>DO you like to delete this book?</p>
                <div className="flex justify-center space-x-3">
                    <Button className="" variant="destructive" onClick={onConfirm}>Yes</Button>
                    <Button className="" onClick={onCancel}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationDialog;