import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Home from "./pages/home/Home.tsx";
import Blog from "./pages/blog/Blog.tsx";
import Music from "./pages/music/Music.tsx";
import Merch from "./pages/merch/Merch.tsx";
import Donate from "./pages/donate/Donate.tsx";
import AdminHome from "./pages/admin/AdminHome.tsx";
import MerchPost from "./pages/merch/Merchpost.tsx";
import BlogPost from "./pages/blog/Blogpost.tsx";
import AdminMusic from "./pages/admin/AdminMusic.tsx";
import AdminMerch from "./pages/admin/AdminMerch.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                children: [
                    { index: true, element: <Home /> },
                    { path: "music", element: <Music /> },
                    { path: "music/:musicId", element: <Music /> },
                    { path: "merch", element: <Merch /> },
                    { path: "merch/:merchId", element: <MerchPost /> },
                    { path: "blog", element: <Blog /> },
                    { path: "blog/:blogId", element: <BlogPost /> },
                    { path: "donate", element: <Donate /> },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                children: [
                    { index: true, element: <AdminHome /> },
                    { path: "music", element: <AdminMusic /> },
                    { path: "music/:musicId", element: <AdminMusic /> },
                    { path: "merch", element: <AdminMerch /> },
                    { path: "blog", element: <AdminBlog /> },
                    { path: "donate", element: <Donate /> },
                ],
            },
        ],
    },
];

export default routes;
