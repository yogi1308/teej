import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard";
import { useMerch } from "../hooks/useMerch";

export default function MerchPost() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !merch?.imageUrl?.length) return;
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
    }, [merch?.imageUrl]);

    return (
        <div className="bg-black min-h-screen text-white p-8 pt-20 font-dots pl-0">
            <div
                ref={scrollRef}
                className="absolute! top-16 left-1/2 -translate-x-1/2 flex flex-col gap-4 h-[calc(100vh_-_6rem)] overflow-y-auto no-scrollbar pb-56"
            >
                {merch?.imageUrl?.map((url, idx) => (
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
            <div
                className="absolute top-1/2 z-100000 transition-all flex flex-col gap-4"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h1 className="flex justify-between w-screen p-4 py-2 border-b border-t border-white bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] items-center">
                    {merch?.title}
                    <div className="flex gap-56">
                        <div className="flex gap-4 items-center">
                            <p>Details</p>
                            {isOpen ? <p>-</p> : <p>+</p>}
                        </div>
                        <p>{merch?.meta && `$ ${merch?.meta}`}</p>
                    </div>
                </h1>
            </div>
        </div>
    );
}
