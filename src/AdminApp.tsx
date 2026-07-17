import { Outlet, useLocation } from "react-router-dom";
import Bg from "./assets/backgrounds/Bg";
import Nav from "./components/nav/Nav";
import { PlayerProvider } from "./hooks/usePlayer";
import Add from "./pages/admin/add/Add";

export default function AdminApp() {
    const { pathname } = useLocation();
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

