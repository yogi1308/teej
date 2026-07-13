import MusicNote from "../../assets/svg/MusicNote";
import HomeSvg from "../../assets/svg/Home";
import MerchSvg from "../../assets/svg/Merch";
import BlogSvg from "../../assets/svg/Blog";
import DonateSvg from "../../assets/svg/Donate";
import CloseIcon from "@/assets/svg/CloseIcon";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navigator({ toggleNavigatorVisibility, dialogRef }) {
    const { pathname } = useLocation();
    const items = ["Home", "Music", "Merch", "Blog", "Donate"];
    const itemAngleStep = 225 / items.length;
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

    function rotateToItem(index: number) {
        let target = -(itemAngleStep * index);
        setActiveIndex(index)
        setPageIcon(iconMap[items[index]]);
        setRotationOffset(target);
    }

    return (
        <dialog ref={dialogRef} className="top-1/2 left-1/2 -translate-1/2 relative border-2 bg-black/70 p-8">
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
                <div className="absolute inset-0" style={{ transform: `rotate(${rotationOffset}deg)` }}>
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
                                    opacity: activeIndex === i ? 1 : 0.4,
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
