import { Link, Outlet, useLocation } from "react-router-dom";
import Hover1 from "@/components/Hover1";

export default function Home() {
    const { pathname } = useLocation();
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] flex">
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{ height: "1px", background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)" }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, #ffffff 100%)" }}
            />
            <div
                className="absolute top-0 left-0 bottom-0 pointer-events-none"
                style={{ width: "1px", background: "linear-gradient(180deg, #ffffff 0%, transparent 100%)" }}
            />
            <div
                className="absolute top-0 right-0 bottom-0 pointer-events-none"
                style={{ width: "1px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }}
            />
            <aside className="bg-white/05 flex flex-col justify-center gap-4 text-2xl">
                <Link to="/music" style={{ textDecoration: "none", color: "inherit" }}>
                    <Hover1 active={pathname.includes("/music")}>Music</Hover1>
                </Link>
                <Link to="/merch" style={{ textDecoration: "none", color: "inherit" }}>
                    <Hover1 active={pathname.includes("/merch")}>Merch</Hover1>
                </Link>
                <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                    <Hover1 active={pathname.includes("/blog")}>Blog</Hover1>
                </Link>
                <Link to="/donate" style={{ textDecoration: "none", color: "inherit" }}>
                    <Hover1 active={pathname.includes("/donate")}>Donate</Hover1>
                </Link>
            </aside>
            <main className="relative bg-black/20 w-full">
                <Outlet />
            </main>
        </div>
    );
}
