import { Link, useLocation } from "react-router-dom";
import Add from "./add/Add.tsx";
import Hover1 from "@/components/Hover1.tsx";
import GradientBorders from "@/components/GradientBorders.tsx";

export default function AdminHome() {
    const { pathname } = useLocation();
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] flex">
            <GradientBorders />
            <main className="flex flex-col bg-white/05 items-center w-full justify-center gap-4 ">
                <h1>TEEJ</h1>
                <div className="flex">
                    <Link to="/music" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/music")}><div className="p-1 px-16">Music</div></Hover1>
                    </Link>
                    <Link to="/merch" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/merch")}><div className="p-1 px-16">Merch</div></Hover1>
                    </Link>
                    <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/blog")}><div className="p-1 px-16">Blog</div></Hover1>
                    </Link>
                    <Link to="/donate" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/donate")}><div className="p-1 px-16">Donate</div></Hover1>
                    </Link>
                </div>
            </main>
            <Add tab={"Home"} />
        </div>
    );
}
