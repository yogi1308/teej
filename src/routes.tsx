import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";
import Music from "./music/Music.tsx";
import Home from "./home/Home.tsx";
import Blog from "./blog/Blog.tsx"
import Merch from "./merch/Merch.tsx"

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
];

export default routes;
