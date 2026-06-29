import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import { useParams } from "react-router-dom";
import { useMerch } from "../hooks/useMerch.tsx";
import { useEffect, useState } from "react";
import SleekLeftArrow from "../assets/svg/SleekLeftArrow.tsx";
import SleekRightArrow from "../assets/svg/SleekRightArrow.tsx";

export default function Merch() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const [currItem, setCurrItem] = useState(merch.length > 0 ? merch[0] : null);
    const [currImgPos, setCurrImgPos] = useState(0);
    useEffect(() => setCurrImgPos(0), [currItem]);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={merch} currItem={currItem} setCurrItem={setCurrItem} />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
                {currItem?.imageUrl.length > 1 && (
                    <div
                        className="absolute z-100000000 left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                        onClick={() => {
                            if (currImgPos !== 0) {
                                setCurrImgPos(prev => prev - 1);
                            }
                        }}
                    >
                        <SleekLeftArrow />
                    </div>
                )}
                <TiltedCard
                    imageSrc={currItem?.imageUrl[0] || logo}
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
                {currItem?.imageUrl.length > 1 && (
                    <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                        onClick={() => {
                            if (currImgPos !== currItem?.imageUrl.length - 1) {
                                setCurrImgPos(prev => prev + 1);
                            }
                        }}
                    >
                        <SleekRightArrow />
                    </div>
                )}
                {currItem?.imageUrl.length > 1 && (
                    <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 cursor-pointer flex flex-col z-1000000 gap-3">
                        {currItem?.imageUrl.map((url, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrImgPos(idx)}
                                className={`rounded-full w-2 h-2 ${idx === currImgPos ? "bg-white/90" : "bg-white/30"} hover:bg-white`}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
