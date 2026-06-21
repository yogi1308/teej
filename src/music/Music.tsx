import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import { useMusic } from "../hooks/useMusic.ts";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Music() {
    const { albumId } = useParams();
    const { music } = useMusic(albumId);
    const [currItem, setCurrItem] = useState(music.length > 0 ? music[0] : null);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent
                content={music}
                currItem={currItem}
                setCurrItem={setCurrItem}
            />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
            {console.log(currItem)}

                <TiltedCard
                    imageSrc={currItem?.imageUrl || currItem?.coverUrl || logo}
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
