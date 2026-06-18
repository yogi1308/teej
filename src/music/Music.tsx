import MainContent from "../components/lists/MainContent.tsx";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import { useMusic } from "../hooks/useMusic.ts";
import { useState } from "react";

export default function Music() {
    const {music} = useMusic()
    const [currItem, setCurrItem] = useState(music.length > 0 ? music[0] : null);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={music} currItem={currItem} setCurrItem={setCurrItem} />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
                <TiltedCard
                    imageSrc={currItem ? currItem.imageUrl : ""}
                    containerHeight="min-content"
                    containerWidth="min-content"
                    imageHeight="clamp(10rem, 60vh, 90vw)"
                    imageWidth="clamp(10rem, 60vh, 90vw)"
                    rotateAmplitude={12}
                    scaleOnHover={1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent
                    overlayContent={
                        <p
                            className="tilted-card-demo-text absolute right-[2rem] top-[3rem]
                text-black! font-hand text-2xl z-2 rotate-45 w-min"
                        >
                            Cool Song
                        </p>
                    }
                />
            </div>
        </div>
    );
}
