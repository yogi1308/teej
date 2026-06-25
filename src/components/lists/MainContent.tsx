import React, { useState, useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import PlayArrow from "../../assets/svg/PlayArrow";
import ArrowRight from "../../assets/ArrowRight";
import { useLocation, useNavigate } from "react-router-dom";
import { MusicPlayerBar } from "../MusicPlayerBar";
import { usePlayer } from "../../hooks/PlayerContext";
import Pause from "../../assets/svg/Pause";

export default function MainContent({ content, currItem, setCurrItem }) {
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [playing, setPlaying] = useState(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { setPlayingLink } = usePlayer();
    const isProgrammaticScroll = useRef(false);

    useEffect(() => {
        setPlayingLink(playing?.link ?? null);
    }, [playing, setPlayingLink]);

    const { scrollY } = useScroll({ container: containerRef });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onEnd = () => {
            isProgrammaticScroll.current = false;
        };
        el.addEventListener("scrollend", onEnd);
        return () => el.removeEventListener("scrollend", onEnd);
    }, []);

    useEffect(() => {
        if (content.length > 0) {
            const exists = currItem && content.some(c => c.id === currItem.id);
            if (!currItem || !exists) setCurrItem(content[0]);
        }
    }, [content, currItem, setCurrItem]);

    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0 });
    }, [content[0]?.id]);

    useEffect(() => {
        const a = audioRef.current;
        if (!a || !playing) return;
        a.play().catch(() => { });
    }, [playing]);

    useMotionValueEvent(scrollY, "change", latest => {
        if (isProgrammaticScroll.current) return;
        const firstItem = containerRef.current?.querySelector(".item") as HTMLElement;
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

    function scrollToItem(item) {
        const container = containerRef.current;
        if (!container) return;
        const items = container.querySelectorAll(".item");
        const idx = content.indexOf(item);
        const el = items[idx] as HTMLElement;
        if (el) {
            isProgrammaticScroll.current = true;
            container.scrollTo({ top: el.offsetTop + 8, behavior: "smooth" });
        }
        setCurrItem(item);
    }

    function toTop(e: React.MouseEvent<HTMLLIElement>, item) {
        scrollToItem(item);

        if (window.location.pathname.includes("blog")) {
            navigate(`/blog/${item.id}`);
        } else if (item.albumId === undefined && window.location.pathname !== `/music/album/${item.albumId}`) {
            navigate(`/music/album/${item.id}`);
        } else if (item.songUrl) {
            setPlaying(item);
            setIsPlaying(true);
        }
    }

    function onNext() {
        const idx = content.findIndex(c => c.id === playing?.id);
        const next = content.slice(idx + 1).find(c => c.songUrl) ?? content.find(c => c.songUrl);
        setIsPlaying(true);
        scrollToItem(next);
        setPlaying(next);
    }

    function onPrevious() {
        const idx = content.findIndex(c => c.id === playing?.id);
        const prev =
            content
                .slice(0, idx)
                .reverse()
                .find(c => c.songUrl) ?? content.toReversed().find(c => c.songUrl);
        setIsPlaying(true);
        scrollToItem(prev);
        setPlaying(prev);
    }

    return (
        <div
            ref={containerRef}
            className="music-list text-white w-screen font-dots absolute top-[50vh] h-[50vh] overflow-auto scrollbar-hide px-4 z-5 "
        >
            <div
                className={`flex justify-between fixed ${location.pathname.includes("blog") ? "top-[calc(50vh-3rem)]" : "top-[calc(50vh-1.2rem)]"} z-2 w-[calc(100vw-2rem)] mr-8 border-t border-b py-2 px-4 bg-[rgba(0,0,0,0.4)]`}
                onClick={e => {
                    toTop(e, currItem);
                }}
            >
                <div className="flex flex-col gap-2">
                    <p className=""> {currItem?.title} </p>
                    <p className="text-[1.0rem]! text-gray-400"> {currItem?.subtitle} </p>
                </div>
                <div className="text-red flex gap-2 items-center">
                    {/* <span>{currItem?.meta}</span> */}
                    {location.pathname.includes("blog")
                        ? new Date(currItem?.meta).toLocaleDateString()
                        : currItem?.songUrl === undefined
                            ? "Album"
                            : currItem?.meta}
                    {currItem?.songUrl === undefined ? <ArrowRight /> : isPlaying ? <Pause /> : <PlayArrow />}
                </div>
            </div>

            <ul className="pb-[calc(50vh+1.2rem)] flex flex-col gap-2 pt-0 after:fixed after:inset-0 after:content-[''] after:pointer-events-none after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_85%,rgba(0,0,0,0.95)_100%)]">
                {content.map(item => (
                    <li
                        key={item.id}
                        className={`item flex gap-4 justify-between p-1 px-4 opacity-80 transition-all duration-300 ease-in-out drop-shadow-[0_3px_3px_rgb(0,0,0)] hover:relative
              hover:scale-101 hover:opacity-100 hover:z-10 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${item.id === 0 ? "invisible" : ""}
            `}
                        onClick={e => toTop(e, item)}
                    >
                        <p
                            className={` flex-1 min-w-0 transition-all duration-300 ease-in-out text-yellow truncate ${item.id === currItem?.id && "opacity-0"}`}
                        >
                            {item.title}
                        </p>
                        <p className={` transition-all duration-300 ease-in-out text-red pr-8 ${item.id === currItem?.id && "opacity-0"}`}>
                            {location.pathname.includes("blog")
                                ? new Date(item?.meta).toLocaleDateString()
                                : item?.songUrl === undefined
                                    ? "Album"
                                    : item?.meta}
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
                    onSeek={t => {
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
                onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}
