import { Outlet } from "react-router-dom";
import Bg from "./assets/backgrounds/Bg";

export default function App() {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Bg />
            <Outlet />
        </div>
    );
}
