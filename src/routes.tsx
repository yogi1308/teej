import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Music from "./music/Music.tsx";
import Home from "./home/Home.tsx";
import Blog from "./blog/Blog.tsx";
import Merch from "./merch/Merch.tsx";
import AdminMerch from "./admin/AdminMerch.tsx";
import AdminBlog from "./admin/AdminBlog.tsx";
import AdminMusic from "./admin/AdminMusic.tsx";
import AdminHome from "./admin/AdminHome.tsx";
import BlogPost from "./blog/Blogpost1.tsx";
import MerchPost from "./merch/MerchPost.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "music", element: <Music /> },
            { path: "music/album/:albumId", element: <Music /> },
            { path: "blog", element: <Blog /> },
            { path: "blog/:blogId", element: <BlogPost /> },
            { path: "merch", element: <Merch /> },
            { path: "merch/:merchId", element: <MerchPost /> },
        ],
    },
    {
        path: "admin",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <AdminHome /> },
            { path: "music", element: <AdminMusic /> },
            { path: "music/album/:albumId", element: <AdminMusic /> },
            { path: "blog", element: <AdminBlog /> },
            { path: "blog/:blogId", element: <BlogPost /> },
            { path: "merch", element: <AdminMerch /> },
            { path: "merch/:merchId", element: <MerchPost /> },
        ],
    },
];

export default routes;
