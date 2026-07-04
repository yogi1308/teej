import { Outlet } from "react-router";
import Nav from "./components/nav/Nav.tsx";
import { PlayerProvider } from "./hooks/PlayerContext.tsx";

export default function App() {
    return (
        <PlayerProvider>
            <div className="flex flex-col">
                <Nav />
                <Outlet />
            </div>
        </PlayerProvider>
    );
}
