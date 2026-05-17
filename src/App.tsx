import { Outlet } from "react-router";
import Nav from "./components/nav/Nav.tsx";

export default function App() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}
