import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Home from "./pages/home/Home.tsx";
import Blog from "./pages/blog/Blog.tsx";
import Music from "./pages/music/Music.tsx";
import Clothing from "./pages/clothing/Clothing.tsx";
import Donate from "./pages/donate/Donate.tsx";
import AdminHome from "./pages/admin/AdminHome.tsx";
import ClothingPost from "./pages/clothing/Clothingpost.tsx";
import BlogPost from "./pages/blog/Blogpost.tsx";
import AdminMusic from "./pages/admin/AdminMusic.tsx";
import AdminClothing from "./pages/admin/AdminClothing.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import AdminApp from "./AdminApp.tsx";
import Login from "./pages/login/Login.tsx";
import ProtectedRoute from "./pages/login/ProtectedRoute.tsx";

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
                    { path: "clothing", element: <Clothing /> },
                    { path: "clothing/:clothingId", element: <ClothingPost /> },
                    { path: "blog", element: <Blog /> },
                    { path: "blog/:blogId", element: <BlogPost /> },
                    { path: "donate", element: <Donate /> },
                    { path: "login", element: <Login /> },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: (
            <ProtectedRoute>
                <AdminApp />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                children: [
                    { index: true, element: <AdminHome /> },
                    { path: "music", element: <AdminMusic /> },
                    { path: "music/:musicId", element: <AdminMusic /> },
                    { path: "clothing", element: <AdminClothing /> },
                    { path: "clothing/:clothingId", element: <ClothingPost /> },
                    { path: "blog", element: <AdminBlog /> },
                    { path: "blog/:blogId", element: <BlogPost /> },
                    { path: "donate", element: <Donate /> },
                ],
            },
        ],
    },
];

export default routes;
