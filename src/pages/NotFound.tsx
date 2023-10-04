import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    navigate('/all-books');
    return (
        <div>Not Found ...</div>
    )
}

export default NotFound