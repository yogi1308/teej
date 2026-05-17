import { useLocation } from "react-router-dom";
import MusicNote from "../../assets/svg/MusicNote";
import ThreeDots from "../../assets/svg/ThreeDots";

export default function Navbar({ onClick }: { onClick?: () => void }) {
    const { pathname } = useLocation();
    const pageName = pathname === "/" ? "Home" : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
    return (
        <nav
            onClick={onClick ?? (() => { })}
            className="flex cursor-pointer justify-between m-4! gap-8 -dots bg-[rgba(0,0,0,0.5)] text-white absolute text-center p-2 
      w-[calc(100% + 10rem)] border-white border-2 left-[50%] -translate-x-1/2 z-1000"
        >
            <MusicNote />
            {pageName}
            <ThreeDots />
        </nav>
    );
}
