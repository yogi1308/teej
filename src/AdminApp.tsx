import { Outlet, useLocation } from "react-router-dom";
import Bg from "./assets/backgrounds/Bg";
import Nav from "./components/nav/Nav";
import { PlayerProvider } from "./hooks/usePlayer";
import Add from "./pages/admin/add/Add";
import { useEffect } from "react";

export default function AdminApp() {
    const { pathname } = useLocation();
    console.log(pathname)
    return (
        <PlayerProvider>
            <div className="h-screen w-screen overflow-hidden relative">
                <Bg />
                <div className="absolute inset-0 z-10">
                    {pathname !== "/admin" && <Nav />}
                    <Outlet />
                </div>
                <Add />
            </div>
        </PlayerProvider>
    );
}

