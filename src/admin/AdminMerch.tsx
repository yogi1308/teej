import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import Add from "./add/Add.tsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMerch } from "../hooks/useMerch.tsx";

export default function AdminMerch() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const [currItem, setCurrItem] = useState(merch.length > 0 ? merch[0] : null);
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !currItem?.imageUrl?.length) return;
        const update = () => {
            const vh = window.innerHeight;
            const cy = vh / 2;
            el.querySelectorAll<HTMLDivElement>(".mc").forEach(c => {
                const r = c.getBoundingClientRect();
                const t = Math.min(Math.abs(r.top + r.height / 2 - cy) / (vh * 0.6), 1);
                c.style.transform = `scale(${1.1 - t * 0.6})`;
            });
        };
        const onScroll = () => requestAnimationFrame(update);
        el.addEventListener("scroll", onScroll);
        update();
        return () => el.removeEventListener("scroll", onScroll);
    }, [currItem?.imageUrl]);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={merch} currItem={currItem} setCurrItem={setCurrItem} />
            <div
                ref={scrollRef}
                className="absolute! top-16 left-1/2 -translate-x-1/2 flex flex-col gap-4 h-[calc(100vh_-_6rem)] overflow-y-auto no-scrollbar pb-56"
            >
                {currItem?.imageUrl?.map((url, idx) => (
                    <div key={idx} className="mc">
                        <TiltedCard
                            imageSrc={url || logo}
                            containerHeight="min-content"
                            containerWidth="min-content"
                            imageHeight="clamp(10rem, 60vh, 90vw)"
                            imageWidth="clamp(10rem, 60vh, 90vw)"
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
