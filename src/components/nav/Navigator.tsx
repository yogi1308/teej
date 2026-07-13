import MusicNote from "../../assets/svg/MusicNote";
import HomeSvg from "../../assets/svg/Home";
import MerchSvg from "../../assets/svg/Merch";
import BlogSvg from "../../assets/svg/Blog";
import DonateSvg from "../../assets/svg/Donate";
import CloseIcon from "@/assets/svg/CloseIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function Navigator({ toggleNavigatorVisibility, dialogRef }) {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const items = ["Home", "Music", "Merch", "Blog", "Donate"];
    const itemAngleStep = 200 / items.length;
    const [activeIndex, setActiveIndex] = useState(() => {
        if (pathname.includes("music")) return 1;
        if (pathname.includes("merch")) return 2;
        if (pathname.includes("blog")) return 3;
        if (pathname.includes("donate")) return 4;
        return 0;
    });
    const iconMap: Record<string, React.ReactNode> = {
        Home: <HomeSvg />,
        Music: <MusicNote />,
        Merch: <MerchSvg />,
        Blog: <BlogSvg />,
        Donate: <DonateSvg />,
    };
    const [rotationOffset, setRotationOffset] = useState(-(itemAngleStep * activeIndex));
    const [pageIcon, setPageIcon] = useState(() => iconMap[items[activeIndex]]);
    const [transitioning, setTransitioning] = useState(false);
    const dragging = useRef(false);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const lastAngle = useRef(0);
    const liveRotation = useRef(rotationOffset);
    const navTimeout = useRef<ReturnType<typeof setTimeout>>();

    function navigateToItem(index: number) {
        let path = items[index] === "Home" ? "/" : `/${items[index].toLowerCase()}`;
        if (location.pathname.includes("admin")) {
            path = items[index] === "Home" ? "/" : `/admin/${items[index].toLowerCase()}`;
        }
        navigate(path);
        toggleNavigatorVisibility();
    }

    function getAngle(clientX: number, clientY: number): number {
        if (!circleRef.current) return 0;
        const rect = circleRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    }

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        liveRotation.current = rotationOffset;
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        lastAngle.current = getAngle(e.clientX, e.clientY);
        setTransitioning(false);
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragging.current) return;
        const currentAngle = getAngle(e.clientX, e.clientY);
        const delta = currentAngle - lastAngle.current;
        lastAngle.current = currentAngle;
        liveRotation.current += delta;
        setRotationOffset(liveRotation.current);
    }

    function snapToItem() {
        const normRot = ((liveRotation.current % 360) + 360) % 360;
        let nearest = 0;
        let bestDist = 360;
        for (let i = 0; i < items.length; i++) {
            const eff = (normRot + itemAngleStep * i) % 360;
            const dist = Math.min(eff, 360 - eff);
            if (dist < bestDist) {
                bestDist = dist;
                nearest = i;
            }
        }
        const target = -(itemAngleStep * nearest);
        setTransitioning(true);
        setActiveIndex(nearest);
        setPageIcon(iconMap[items[nearest]]);
        setRotationOffset(target);
        clearTimeout(navTimeout.current);
        navTimeout.current = setTimeout(() => navigateToItem(nearest), 700);
    }

    function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragging.current) return;
        dragging.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        snapToItem();
    }

    function rotateToItem(index: number) {
        let target = -(itemAngleStep * index);
        setTransitioning(true);
        setActiveIndex(index);
        setPageIcon(iconMap[items[index]]);
        setRotationOffset(target);
        clearTimeout(navTimeout.current);
        navTimeout.current = setTimeout(() => navigateToItem(index), 700);
    }

    const normRot = ((rotationOffset % 360) + 360) % 360;
    let highlightedIndex = 0;
    let bestDist = 360;
    for (let i = 0; i < items.length; i++) {
        const eff = (normRot + itemAngleStep * i) % 360;
        const dist = Math.min(eff, 360 - eff);
        if (dist < bestDist) {
            bestDist = dist;
            highlightedIndex = i;
        }
    }

    return (
        <dialog ref={dialogRef} className="top-1/2 left-1/2 -translate-1/2 relative border-2 bg-black/70 p-8 overflow-hidden">
            <div className="flex justify-between gap-4 text-center p-2 border-2 w-[15rem]">
                {pageIcon}
                <p>{items[activeIndex]}</p>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        toggleNavigatorVisibility();
                    }}
                >
                    <CloseIcon />
                </div>
            </div>
            <div className="relative h-[17.5rem]">
                <div className="size-12 rounded-full border border-white absolute top-1/2 left-1/2 -translate-1/2"></div>
                <div className="size-32 rounded-full border border-white absolute top-1/2 left-1/2 -translate-1/2"></div>
                <div className="size-32 absolute top-1/2 -translate-y-1/2 ">
                    <div className="size-2 rounded-full bg-white absolute top-1/2 left-1/2 -translate-1/2 -translate-x-3"></div>
                </div>
                <div
                    ref={circleRef}
                    className="absolute inset-0 cursor-grab touch-none"
                    style={{ transform: `rotate(${rotationOffset}deg)`, transition: transitioning ? "transform 0.5s ease" : "none" }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {items.map((item, i) => {
                        const angle = itemAngleStep * i;
                        return (
                            <p
                                key={i}
                                className="absolute select-none hover:opacity-80! cursor-pointer"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `
                            translate(-50%, -50%)
                            rotate(${angle}deg)
                            translate(-100px)

                            `,
                                    opacity: highlightedIndex === i || activeIndex === i ? 1 : 0.4,
                                }}
                                onClick={() => {
                                    rotateToItem(i);
                                }}
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
            </div>
            <div className="border border-white my-4"></div>
        </dialog>
    );
}
