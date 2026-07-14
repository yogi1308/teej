import { useEffect, useRef, useState } from "react";
import Thumbnail from "./Thumbnail";
import SleekLeftArrow from "@/assets/svg/SleekLeftArrow";

export default function Carousel({ src, style }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const slides = src ?? [];

    const scrollBy = (dir: number) => {
        const first = cardRefs.current[0];
        if (!first) return;
        scrollRef.current?.scrollBy({ left: dir * (first.offsetWidth + 48), behavior: "smooth" });
    };

    useEffect(() => {
        onScroll();
    }, [src]);

    function onScroll() {
        const cx = window.innerWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        cardRefs.current.forEach((c, i) => {
            if (!c) return;
            const r = c.getBoundingClientRect();
            const dist = r.left + r.width / 2 - cx;
            const t = Math.abs(dist) / (window.innerWidth * 0.6);
            const s = Math.max(0.1, 1 - t * 0.9);
            c.style.transform = `scale(${s})`;
            if (Math.abs(dist) < minDist) {
                minDist = Math.abs(dist);
                closest = i;
            }
        });
        setCurrentIdx(closest);
    }

    return (
        <div ref={scrollRef} className="flex w-screen overflow-x-auto snap-x snap-mandatory no-scrollbar gap-12" onScroll={onScroll}>
            <div className="shrink-0" style={{ minWidth: "clamp(10rem, 60vh, 60vw)" }} />
            {src?.map((url, index) => (
                <div
                    ref={el => {
                        cardRefs.current[index] = el;
                    }}
                    key={index}
                    className="shrink-0 snap-center duration-0!"
                >
                    <Thumbnail src={url} style={style} />
                </div>
            ))}
            <div className="shrink-0" style={{ minWidth: "clamp(10rem, 60vh, 60vw)" }} />
            {currentIdx > 0 && (
                <div
                    className="fixed top-[25vh] left-0 p-1 flex items-center mx-2 justify-center rounded-full focus:border-[#6D64F7] focus:outline-none hover:scale-110 active:scale-90 transition duration-100! cursor-pointer"
                    onClick={() => scrollBy(-1)}
                >
                    <SleekLeftArrow />
                </div>
            )}
            {currentIdx < slides.length - 1 && (
                <div
                    className="fixed top-[25vh] right-0 rotate-180 p-1 flex items-center mx-2 justify-center rounded-full focus:border-[#6D64F7] focus:outline-none hover:scale-110 active:scale-90 transition duration-100! cursor-pointer"
                    onClick={() => scrollBy(1)}
                >
                    <SleekLeftArrow />
                </div>
            )}
        </div>
    );
}
