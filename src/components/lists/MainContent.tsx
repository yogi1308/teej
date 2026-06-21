import React, { useState, useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import PlayArrow from "../../assets/svg/PlayArrow";
import ArrowRight from "../../assets/ArrowRight";
import { useNavigate } from "react-router-dom";
import { MusicPlayerBar } from "../MusicPlayerBar";

export default function MainContent({ content, currItem, setCurrItem }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { scrollY } = useScroll({ container: containerRef });

    useEffect(() => {
        if (currItem === null && content.length > 0) {
            setCurrItem(content[0]);
        }
    }, [content, currItem, setCurrItem]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const firstItem = containerRef.current?.querySelector(
            ".item",
        ) as HTMLElement;
        if (!firstItem) return;

        const itemHeight = firstItem.offsetHeight;
        const gap = 8;
        const totalStep = itemHeight + gap;
        const targetIndex = Math.floor(latest / totalStep);

        if (targetIndex >= 0 && targetIndex < content.length) {
            const exitedSong = content[targetIndex];

            if (exitedSong.id !== currItem?.id) {
                setCurrItem(exitedSong);
            }
        } else if (targetIndex < 0) {
            setCurrItem(content[0]);
        }
    });

    function toTop(e: React.MouseEvent<HTMLLIElement>, item) {
        console.log(item);
        const container = containerRef.current;
        if (!container) return;

        const element = e.currentTarget;

        container.scrollTo({
            top: element.offsetTop + 8,
            behavior: "smooth",
        });

        if (
            item.albumId === undefined &&
            window.location.pathname !== `/music/album/${item.albumId}`
        ) {
            navigate(`/music/album/${item.id}`);
        } else if (item.songUrl) {
            setPlaying(item);
        }
    }

    function onNext() {
        const next = content.slice(playingIndex + 1).find((c) => c.songUrl);
        if (next) setPlaying(next);
    }
    function onPrevious() {
        const prev = content
            .slice(0, playingIndex)
            .reverse()
            .find((c) => c.songUrl);
        if (prev) setPlaying(prev);
    }

    return (
        <div
            ref={containerRef}
            className="music-list text-white w-screen font-dots absolute top-[50vh] h-[50vh] overflow-auto scrollbar-hide px-4 z-5"
        >
            <div className="flex justify-between fixed top-[calc(50vh-1.2rem)] z-2 w-[calc(100vw-2rem)] mr-8 border-t border-b py-2 px-4 bg-[rgba(0,0,0,0.4)]">
                <p className="text-yellow"> {currItem?.title} </p>
                <div className="text-red flex gap-2 items-center">
                    {/* <span>{currItem?.meta}</span> */}
                    {currItem?.songUrl === undefined ? "Album" : currItem?.meta}
                    {currItem?.songUrl === undefined ?  <ArrowRight />: <PlayArrow />}
                </div>
            </div>

            <ul className="pb-[calc(50vh+1.2rem)] flex flex-col gap-2 pt-0 after:fixed after:inset-0 after:content-[''] after:pointer-events-none after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_85%,rgba(0,0,0,0.95)_100%)]">
                {content.map((item) => (
                    <li
                        key={item.id}
                        className={`item flex gap-4 justify-between p-1 px-4 opacity-80 transition-all duration-300 ease-in-out drop-shadow-[0_3px_3px_rgb(0,0,0)] hover:relative
              hover:scale-101 hover:opacity-100 hover:z-10 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${item.id === 0 ? "invisible" : ""}
            `}
                        onClick={(e) => toTop(e, item)}
                    >
                        <p
                            className={` flex-1 min-w-0 transition-all duration-300 ease-in-out text-yellow truncate ${item.id === currItem?.id && "opacity-0"}`}
                        >
                            {item.title}
                        </p>
                        <p
                            className={` transition-all duration-300 ease-in-out text-red pr-8 ${item.id === currItem?.id && "opacity-0"}`}
                        >
                            {item?.songUrl === undefined ? "Album" : item?.meta}
                        </p>
                    </li>
                ))}
            </ul>
            {playing !== null && (
                <MusicPlayerBar
                    playing={playing}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    onToggle={() => {
                        const a = audioRef.current;
                        if (a) a.paused ? a.play() : a.pause();
                    }}
                    onSeek={(t) => {
                        const a = audioRef.current;
                        if (a) {
                            a.currentTime = t;
                            setCurrentTime(t);
                        }
                    }}
                    onNext={onNext}
                    onPrevious={onPrevious}
                />
            )}
            <audio
                ref={audioRef}
                src={playing?.songUrl ?? ""}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}
