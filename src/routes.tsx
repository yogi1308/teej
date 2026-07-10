import App from "./App";
import ErrorPage from "./errorPage/ErrorPage.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <></> },
            // { path: "music", element: <></> },
            // { path: "music/album/:albumId", element: <></> },
            // { path: "blog", element: <></> },
            // { path: "blog/:blogId", element: <></> },
            // { path: "merch", element: <></> },
            // { path: "merch/:merchId", element: <></> },
            // { path: "donate", element: <></> },
        ],
    },
    {
        path: "admin",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <></> },
            // { path: "music", element: <></> },
            // { path: "music/album/:albumId", element: <></> },
            // { path: "blog", element: <></> },
            // { path: "blog/:blogId", element: <></> },
            // { path: "merch", element: <></> },
            // { path: "merch/:merchId", element: <></> },
            // { path: "donate", element: <></> },
        ],
    },
];

export default routes;
