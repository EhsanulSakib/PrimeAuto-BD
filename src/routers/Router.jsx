import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import ErrorPage from "../pages/errorpage/Errorpage";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router;