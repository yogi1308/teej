import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Home from "./pages/home/Home.tsx";
import Blog from "./pages/blog/Blog.tsx";
import Music from "./pages/music/Music.tsx";
import Merch from "./pages/merch/Merch.tsx";
import Donate from "./pages/donate/Donate.tsx";
import AdminHome from "./pages/admin/AdminHome.tsx";
import MerchPost from "./pages/merch/Merchpost1.tsx";

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
                    { path: "merch", element: <Merch /> },
                    { path: "merch/:merchId", element: <MerchPost /> },
                    { path: "blog", element: <Blog /> },
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
                    { path: "music", element: <Music /> },
                    { path: "merch", element: <Merch /> },
                    { path: "blog", element: <Blog /> },
                    { path: "donate", element: <Donate /> },
                ],
            },
        ],
    },
];

export default routes;
