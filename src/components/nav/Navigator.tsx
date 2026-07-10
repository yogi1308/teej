import MusicNote from "../../assets/svg/MusicNote";
import HomeSvg from "../../assets/svg/Home";
import MerchSvg from "../../assets/svg/Merch";
import BlogSvg from "../../assets/svg/Blog";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import DonateSvg from "../../assets/svg/Donate";

interface NavigatorProps {
    setNavigatorVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    dialogRef: React.RefObject<HTMLDialogElement | null>;
}

export default function Navigator({ setNavigatorVisibility, dialogRef }: NavigatorProps) {
    const items = ["Music", "Merch", "Blog", "Donate"];
    const navigate = useNavigate();
    const [rotation, setRotation] = useState(0);
    const dragging = useRef(false);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const lastAngle = useRef<number>(0);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split("/").pop() || "";
        const idx = items.findIndex(i => i.toLowerCase() === path);
        if (idx > 0) setRotation(-idx * itemAngleStep);
    }, [])

    // Calculate which item is currently "active" based on rotation
    const itemAngleStep = 180 / items.length;
    const normRot = ((rotation % 360) + 360) % 360;
    let activeIndex = 0;
    let bestDist = 360;
    for (let i = 0; i < items.length; i++) {
        const eff = (normRot + i * itemAngleStep) % 360;
        const dist = Math.min(eff, 360 - eff);
        if (dist < bestDist) {
            bestDist = dist;
            activeIndex = i;
        }
    }
    const leftMost = items[activeIndex] || items[0];

    const iconMap: Record<string, React.ReactNode> = {
        Home: <HomeSvg />,
        Music: <MusicNote />,
        Merch: <MerchSvg />,
        Blog: <BlogSvg />,
        Donate: <DonateSvg />
    };
    const pageIcon = iconMap[leftMost] || <MusicNote />;

    const getAngle = (clientX: number, clientY: number): number => {
        if (!circleRef.current) return 0;
        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        lastAngle.current = getAngle(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;
        const currentAngle = getAngle(e.clientX, e.clientY);
        const delta = currentAngle - lastAngle.current;
        setRotation(prev => prev + delta);
        lastAngle.current = currentAngle;
    };

    const snapToItem = () => {
        const normRot = ((rotation % 360) + 360) % 360;
        let nearest = 0;
        let bestDist = 360;
        for (let i = 0; i < items.length; i++) {
            const eff = (normRot + i * itemAngleStep) % 360;
            const dist = Math.min(eff, 360 - eff);
            if (dist < bestDist) {
                bestDist = dist;
                nearest = i;
            }
        }
        const target = 0 - nearest * itemAngleStep;
        let frame: number;
        const animate = () => {
            setRotation(prev => {
                const diff = target - prev;
                if (Math.abs(diff) < 0.5) {
                    cancelAnimationFrame(frame);
                    setTimeout(() => {
                        let path = "";
                        if (location.pathname.includes("admin")) {
                            path = nearest === 0 ? "/" : `/admin/${items[nearest].toLowerCase()}`;
                        } else {
                            path = nearest === 0 ? "/" : `/${items[nearest].toLowerCase()}`;
                        }
                        setNavigatorVisibility(false);
                        navigate(path);
                    }, 100);
                    return target;
                }
                return prev + diff * 0.2;
            });
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        snapToItem();
    };

    const toggleNavigatorVisibility = () => setNavigatorVisibility((visibility: boolean) => !visibility);

    const rotateToItem = (index: number) => {
        const target = 0 - index * itemAngleStep;
        let frame: number;
        const animate = () => {
            setRotation(prev => {
                const diff = target - prev;
                if (Math.abs(diff) < 0.5) {
                    cancelAnimationFrame(frame);
                    setTimeout(() => {
                        let path = "";
                        if (location.pathname.includes("admin")) {
                            path = items[index] === "Home" ? "/" : `/admin/${items[index].toLowerCase()}`;
                        } else {
                            path = items[index] === "Home" ? "/" : `/${items[index].toLowerCase()}`;
                        }
                        setNavigatorVisibility(false);
                        navigate(path);
                    }, 100);
                    return target;
                }
                return prev + diff * 0.15;
            });
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
    };

    return (
        <dialog
            ref={dialogRef}
            className="navigator select-none overflow-hidden h-110 w-80 font-dots absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white z-6 border border-white pt-8 px-8 pb-0 origin-center flex flex-col"
        >
            <div className="relative flex-1 w-full">
                <div className="flex justify-between gap-4 bg-black absolute text-center p-2 border-white border-2 left-[50%] -translate-x-1/2 min-w-[calc(100%-2rem)] ">
                    {pageIcon}
                    <p>{leftMost}</p>
                    <p onClick={toggleNavigatorVisibility} className="cursor-pointer">
                        ×
                    </p>
                </div>
                <div className="absolute top-[55%] left-[calc(50%-4rem)] -translate-x-1/2 -translate-y-1/2 z-1 select-none">●</div>
                <div
                    className="flex justify-between border border-white w-32 h-32 rounded-full absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center cursor-grab touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    ref={circleRef}
                >
                    {items.map((item, i) => {
                        const angle = itemAngleStep * i;
                        return (
                            <p
                                key={i}
                                className="absolute top-[55%] left-1/2 -translate-x-1/2 translate-y-[-90%] select-none hover:opacity-80 cursor-pointer "
                                style={{
                                    transform: `
                  rotate(${angle}deg)
                  translate(-130px)
                `,
                                    opacity: leftMost === item ? 1 : 0.4,
                                }}
                                onClick={() => rotateToItem(i)}
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
                <div className=" border border-white w-12 h-12 rounded-full absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
            </div>
            <div className="border border-white w-full mb-10"></div>
        </dialog>
    );
}
