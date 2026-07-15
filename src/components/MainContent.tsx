import { useRef, useEffect, useState } from "react";
import ArrowRight from "@/assets/svg/ArrowRight";
import Pause from "@/assets/svg/Pause";
import PlayArrow from "@/assets/svg/PlayArrow";
import AudioPlayer from "./AudioPlayer";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingContent from "@/pages/load/LoadingContent";

export default function MainContent({ content, currItem, setCurrItem, loading }) {
    const navigate = useNavigate();
    const location = useLocation();
    const ulRef = useRef(null);
    const currRef = useRef(currItem);
    currRef.current = currItem;
    const [ulHeight, setUlHeight] = useState(0);
    const [playing, setPlaying] = useState(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // used to calcaluate padding bottom so that the last element can scroll all the way to the top
        if (ulRef.current) {
            setUlHeight(ulRef.current.offsetHeight);
            ulRef.current.scrollTop = 0;
        }
    }, [content]);

    useEffect(() => {
        // scroll listener + IntersectionObserver to detect which item is in the active zone
        const container = ulRef.current;
        if (!container || content?.length === 0) return;

        function onScroll() {
            // at the top boundary, force currItem to the first item (observer misses it)
            if (container.scrollTop <= 0) {
                const first = content?.[0];
                if (first && first.id !== currRef.current?.id) setCurrItem(first);
            }
        }

        container.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const observer = new IntersectionObserver( // fires when an item crosses the detection band at the top
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-id");
                        const item = content.find(c => c.id === id);
                        if (item && item.id !== currRef.current?.id) {
                            setCurrItem(item);
                        }
                        break;
                    }
                }
            },
            {
                root: container,
                rootMargin: "5% 0px -103% 0px",
                threshold: 0,
            },
        );

        for (const li of container.querySelectorAll("li[data-id]")) {
            observer.observe(li);
        }
        return () => {
            observer.disconnect();
            container.removeEventListener("scroll", onScroll);
        };
    }, [content]);

    async function onclick(item) {
        const li = ulRef.current?.querySelector(`[data-id="${item.id}"]`);
        if (li) {
            const top = (li as HTMLElement).offsetTop;
            if (ulRef.current?.scrollTop !== top) {
                await new Promise(resolve => {
                    ulRef.current?.addEventListener("scrollend", resolve, { once: true });
                    ulRef.current?.scrollTo({ top, behavior: "smooth" });
                });
            }
        }
        if (item.type === "track") {
            setPlaying(item);
            setIsPlaying(true);
        } else {
            navigate(`${location.pathname}/${item.id}`);
        }
    }

    return (
    //     <div className="absolute bottom-0 top-1/2 h-1/2 w-full overflow-hidden flex flex-col">
    //         <div
    //             className="shrink-0 flex items-center justify-between border-y relative p-2 px-4 bg-black/10 cursor-pointer hover:bg-black/70"
    //             onClick={() => {
    //                 onclick(currItem);
    //             }}
    //         >
    //             {currItem?.subtitle ? (
    //                 <div className="flex flex-col">
    //                     <p className=""> {currItem?.title} </p>
    //                     <p className="text-[1.0rem]! text-gray-400"> {currItem?.subtitle} </p>
    //                 </div>
    //             ) : (
    //                 <p className="truncate">{currItem?.title}</p>
    //             )}
    //             <div className="flex gap-4">
    //                 {currItem?.type === "merch" ? (
    //                     <p className="truncate">{`$ ${currItem?.meta}`}</p>
    //                 ) : currItem?.type === "blog" ? (
    //                     <p className="truncate">{new Date(currItem?.meta).toLocaleDateString()}</p>
    //                 ) : (
    //                     <p className="truncate">{currItem?.meta || "Album"}</p>
    //                 )}
    //                 {currItem?.type !== "track" ? <ArrowRight /> : isPlaying ? <Pause /> : <PlayArrow />}
    //             </div>
    //         </div>
    //         <ul ref={ulRef} className="flex-1 overflow-y-auto " style={{ paddingBottom: ulHeight }}>
    //             {content?.map((item, i) => (
    //                 <li
    //                     className={`cursor-pointer group flex justify-between my-2 p-2 px-4 ${i === 0 ? "h-0 invisible hidden" : "hover:bg-black/40"} `}
    //                     key={item.id}
    //                     data-id={item.id}
    //                     onClick={() => onclick(item)}
    //                 >
    //                     <p className="truncate">{item?.title}</p>
    //                     <div className="flex gap-0 group-hover:gap-4 items-center">
    //                         {item?.type === "merch" ? (
    //                             <p className="truncate">{`$ ${item?.meta}`}</p>
    //                         ) : item?.type === "blog" ? (
    //                             <p className="truncate">{new Date(item?.meta).toLocaleDateString()}</p>
    //                         ) : (
    //                             <p className="truncate">{item?.meta || "Album"}</p>
    //                         )}
    //                         <div className="w-0 scale-x-0 group-hover:w-auto group-hover:scale-x-100 overflow-hidden">
    //                             {item.type !== "track" ? <ArrowRight /> : isPlaying ? <Pause /> : <PlayArrow />}
    //                         </div>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //         <AudioPlayer
    //             audioRef={audioRef}
    //             content={content}
    //             playing={playing}
    //             setPlaying={setPlaying}
    //             isPlaying={isPlaying}
    //             setIsPlaying={setIsPlaying}
    //             onclick={onclick}
    //         />
    //     </div>
    <LoadingContent />
    );
}
