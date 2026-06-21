import { Outlet } from "react-router";
import Nav from "./components/nav/Nav.tsx";
import { PlayerProvider } from "./hooks/PlayerContext.tsx";

export default function App() {
    return (
        <PlayerProvider>
            <Nav />
            <Outlet />
        </PlayerProvider>
    );
}
