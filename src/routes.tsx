import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Music from "./music/Music.tsx";
import Home from "./home/Home.tsx";
import Blog from "./blog/Blog.tsx"
import Merch from "./merch/Merch.tsx"
import AdminMerch from "./admin/AdminMerch.tsx";
import AdminBlog from "./admin/AdminBlog.tsx";
import AdminMusic from "./admin/AdminMusic.tsx";
import AdminHome from "./admin/AdminHome.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "music", element: <Music /> },
            { path: "blog", element: <Blog /> },
            { path: "merch", element: <Merch /> },
        ],
    },
    {
        path: "admin",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <AdminHome /> },
            { path: "music", element: <AdminMusic /> },
            { path: "blog", element: <AdminBlog /> },
            { path: "merch", element: <AdminMerch /> },
        ],
    }
];

export default routes;
