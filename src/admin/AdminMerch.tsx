import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import Add from "./add/Add.tsx";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import { useMerch } from "../hooks/useMerch.tsx";

export default function AdminMerch() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const [currItem, setCurrItem] = useState(merch.length > 0 ? merch[0] : null);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={merch} currItem={currItem} setCurrItem={setCurrItem} />
            <div className="absolute! top-12 left-1/2 -translate-x-1/2">
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
            </div>
            <Add tab={"Merch"} />
        </div>
    );
}
