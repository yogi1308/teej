import { Outlet, useLocation } from "react-router-dom";
import Bg from "./assets/backgrounds/Bg";
import Nav from "./components/nav/Nav";

export default function App() {
    const { pathname } = useLocation();
    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <Bg />
            <div className="absolute inset-0 z-10">
                {pathname !== "/" && <Nav />}
                <Outlet />
            </div>
        </div>
    );
}
