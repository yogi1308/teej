import { Outlet } from "react-router-dom";
import Bg from "./assets/backgrounds/Bg";

export default function App() {
    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <Bg />
            <div className="absolute inset-0 z-10">
                <Outlet />
            </div>
        </div>
    );
}
