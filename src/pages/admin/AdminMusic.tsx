import MainContent from "../components/lists/MainContent.tsx";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import Add from "./add/Add.tsx";
import { useMusic } from "../hooks/useMusic.ts";
import { useState } from "react";

export default function AdminMusic() {
    const { music, refetch } = useMusic();
    const [currItem, setCurrItem] = useState(music.length > 0 ? music[0] : null);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent
                content={music}
                currItem={currItem}
                setCurrItem={setCurrItem}
            />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
                <TiltedCard
                    imageSrc={currItem?.imageUrl || currItem?.coverUrl }
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
            <Add tab={"Music"} refetch={async () => { const d = await refetch(); setCurrItem(d[0]); }} />
        </div>
    );
}
