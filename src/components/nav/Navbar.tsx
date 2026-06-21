import { useLocation } from "react-router-dom";
import MusicNote from "../../assets/svg/MusicNote";
import ThreeDots from "../../assets/svg/ThreeDots";
import { usePlayer } from "../../hooks/PlayerContext";
import SoundCloud from "../../assets/svg/SoundCloud";

export default function Navbar({ onClick }: { onClick?: () => void }) {
    const { pathname } = useLocation();
    const { playingLink } = usePlayer();
    let pageName = "Home";
    if (pathname.includes("music")) pageName = "Music";
    else if (pathname.includes("blog")) pageName = "Blog";
    else if (pathname.includes("merch")) pageName = "Merch";

    return (
        <nav className="flex items-center absolute left-[50%] -translate-x-1/2 z-1000">
            <div
                onClick={onClick ?? (() => { })}
                className="flex cursor-pointer shrink-0 justify-between m-4! gap-8 -dots bg-[rgba(0,0,0,0.5)] text-white text-center p-2 
        w-[calc(100vw + 10rem)] border-white border-2"
            >
                <MusicNote />
                {pageName}
                <ThreeDots />
            </div>
            {playingLink && (
                <a
                    href={playingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white bg-[rgba(0,0,0,0.5)] flex items-center justify-center size-10"
                >
                    <SoundCloud />
                </a>
            )}
        </nav>
    );
}
