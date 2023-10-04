import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    navigate(-1);
    return (
        <div>Not Found ...</div>
    )
}

export default NotFound