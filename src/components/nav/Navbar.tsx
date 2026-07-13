import { useLocation } from "react-router-dom";
import MusicNote from "../../assets/svg/MusicNote";
import HomeSvg from "../../assets/svg/Home";
import MerchSvg from "../../assets/svg/Merch";
import BlogSvg from "../../assets/svg/Blog";
import ThreeDots from "../../assets/svg/ThreeDots";
import SoundCloud from "../../assets/svg/SoundCloud";
import DonateSvg from "../../assets/svg/Donate";
import { usePlayer } from "@/hooks/usePlayer";

export default function Navbar({ onClick }: { onClick?: () => void }) {
    const { pathname } = useLocation();
    const { playingLink } = usePlayer();
    let pageName = "Home";
    let pageIcon = <HomeSvg />;
    if (pathname.includes("music")) {
        pageName = "Music";
        pageIcon = <MusicNote />;
    } else if (pathname.includes("blog")) {
        pageName = "Blog";
        pageIcon = <BlogSvg />;
    } else if (pathname.includes("merch")) {
        pageName = "Merch";
        pageIcon = <MerchSvg />;
    } else if (pathname.includes("donate")) {
        pageName = "Donate";
        pageIcon = <DonateSvg />;
    }

    return (
        <nav className={`flex items-center absolute left-1/2 -translate-x-1/2 top-0}`}>
            <div
                onClick={onClick ?? (() => { })}
                className="flex cursor-pointer justify-between m-4! gap-8 backdrop-blur-md text-center p-2 
         border-white border-2 items-center"
            >
                {pageIcon}
                {pageName}
                <ThreeDots />
            </div>
            {playingLink && (
                <a
                    href={playingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white flex items-center justify-center size-10"
                >
                    <SoundCloud />
                </a>
            )}
        </nav>
    );
}
