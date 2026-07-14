import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import Add from "./add/Add.tsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function AdminMerch() {
    const { merchId } = useParams();
    const { data: merch } = useFetch(merchId ? `/api/merch/${merchId}` : "/api/merch/");
    const [currItem, setCurrItem] = useState(merch.length > 0 ? merch[0] : null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {onScroll()}, [currItem])

    function onScroll() {
        const cx = window.innerWidth / 2;
        cardRefs.current.forEach(c => {
            if (!c) return;
            const r = c.getBoundingClientRect();
            const dist = r.left + r.width / 2 - cx;
            const t = Math.min(Math.abs(dist) / (window.innerWidth * 0.6), 1);
            const s = Math.max(1.1 - t * 1.9, 0.0)
            c.style.transform = `perspective(1000px) scale(${s}) rotateY(${(dist > 0 ? 1 : -1) * t * 45}deg)`
        });
    }

    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={merch} currItem={currItem} setCurrItem={setCurrItem} />
            <div
                ref={scrollRef}
                className="absolute! top-16 left-1/2 -translate-x-1/2 flex gap-4 no-scrollbar px-148 w-[calc(100vw)] h-[calc(100vh-6rem)] overflow-hidden overflow-x-scroll snap-x snap-mandatory"
                onScroll={onScroll}
                onWheel={e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY }}
            >
                {currItem?.imageUrl?.map((url, idx) => (
                    <div key={idx} ref={el => (cardRefs.current[idx] = el)} className="snap-center">
                        <TiltedCard
                            imageSrc={url || logo}
                            containerHeight="clamp(10rem, 60vh, 90vh)"
                            containerWidth="clamp(10rem, 60vh, 90vw)"
                            imageHeight="100%"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent
                        />
                    </div>
                ))}
            </div>
            <Add tab={"Merch"} />
        </div>
    );
}
