import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import routes from "./routes";

if (!window.location.pathname.startsWith("/admin"))
    console.log(
        "%c __   _____   ____ ___ \n \\ \\ / / _ \\ / ___|_ _|\n  \\ V / | | | |  _ | | \n   | || |_| | |_| || |\n   |_| \\___/ \\____|___|\n\n%c",
        "font-size:14px; color:#a78bfa; font-weight:bold;",
        "font-size:11px; color:#6b7280; font-family:monospace;"
    );

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
