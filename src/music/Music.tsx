import { useEffect, useState } from "react";
import MarqueeContents from "./MarqueeContents.tsx"
import MainContent from "./MainContent.tsx"
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import yellowAudio from "../assets/Gemini_Generated_Image_sb0r0rsb0r0rsb0r.png"
import TiltedCard from "../components/onlineLibraries/TiltedCard.jsx"

export default function Music() {
  const [columnCount, setColumnCount] = useState(0)
  const music = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `lorem ipsum dolor amit ${i}`,
    duration: "0:00",
  }));
  useEffect(() => {
    const calc = () => {
      const cols = parseFloat(getComputedStyle(document.body).getPropertyValue('--column-width'));
      const colWidth = window.innerHeight / cols;
      setColumnCount(Math.max(2, Math.floor(window.innerWidth / (colWidth + 8))));
    }
    calc();
    window.addEventListener("resize", calc);
  }, [])
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
      {/* <nav className="flex justify-between absolute bg-transparent top-0 w-screen text-white p-4 font-cyberpunk text-3xl font-extrabold [text-shadow:1.5px_1.5px_0_#42fa24] py-2 tracking-widest">
        <div className="text-yellow">Teej</div>
        <div className="flex gap-8 text-red">
          <p>Posts</p>
          <p>Merch</p>
        </div>
      </nav> */}
      <MainContent music={music} />
      {/* <img
        src={logo}
        alt=""
        className="absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 w-100 
          shadow-[0_10px_40px_rgba(255,255,255,0.3),0_20px_80px_rgba(255,255,255,0.2)]"
      />
      <p
        className="absolute top-1/5 left-[calc(50%+8rem)] -translate-x-1/2 -translate-y-1/2 
              !text-black font-hand text-3xl z-2 rotate-45 w-min"
      >
        Cool Song
      </p> */}
      <TiltedCard
        className="absolute! top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2"
        imageSrc={logo}
        containerHeight="25rem"
        containerWidth="25rem"
        imageHeight="25rem"
        imageWidth="25rem"
        rotateAmplitude={12}
        scaleOnHover={1}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <p
            className="tilted-card-demo-text absolute left-[calc(50%+18.5rem)] top-[calc(50%+4rem)]  
              text-black! font-hand text-2xl z-2 rotate-45 w-min"
          >
            Cool Song
          </p>
        }
      />

      {/* <img src={yellowAudio} className="w-screen h-80" /> */}
    </div>
  );
}
