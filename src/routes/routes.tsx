import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import BookDetails from "@/pages/BookDetails";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children:[
            {
                index:true,
                element: <Home></Home>
            },
            {
                path:'/all-books',
                element:<AllBooks></AllBooks>
            },
            {
                path:'/book-details/:id',
                element:<BookDetails></BookDetails>
            }
        ]
    },
    
]);

export default routes;