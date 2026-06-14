import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import Add from "./add/Add.tsx"

export default function AdminMusic() {
    const music = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        title: `lorem ipsum dolor amit ${i}`,
        meta: "0:00",
    }));
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={music} />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
                <TiltedCard
                    imageSrc={logo}
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
            <Add />
        </div>
    );
}
