import { useEffect, useState } from "react";
import MarqueeContents from "./MarqueeContents.tsx";
import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";

export default function Music() {
  const [columnCount, setColumnCount] = useState(0);
  const music = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `lorem ipsum dolor amit ${i}`,
    duration: "0:00",
  }));
  useEffect(() => {
    const calc = () => {
      const cols = parseFloat(
        getComputedStyle(document.body).getPropertyValue("--column-width"),
      );
      const colWidth = window.innerHeight / cols;
      setColumnCount(
        Math.max(2, Math.floor(window.innerWidth / (colWidth + 8))),
      );
    };
    calc();
    window.addEventListener("resize", calc);
  }, []);
  return (
    <div className="bg-black h-screen w-screen overflow-hidden">
      {/* <div
        className="p-2 grid h-screen w-screen overflow-hidden  grid-cols-[repeat(auto-fit,minmax(calc(var(--column-width)*1px),1fr))] gap-2
        after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1.0)_100%)]"
      >
        {Array.from({ length: columnCount }, (_, i) => (
          <MarqueeContents key={i} direction={i % 2 === 0 ? "up" : "down"} />
        ))}
      </div> */}
      <MainContent music={music} />
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
    </div>
  );
}
