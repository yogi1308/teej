import TiltedCard from "../components/onlineLibraries/TiltedCard";
import myNameIs from "../assets/bg/mayNameIsRed.png"

export default function Home() {
    return (
      <div className="w-screen h-screen bg-black flex flex-row align-center">
        <TiltedCard
          className="flex"
          imageSrc={myNameIs}
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
              className="tilted-card-demo-text relative left-[50%] top-[50%]  
              text-[#0320ca] font-marker text-[8rem] z-2 w-min opacity-85 font-hand"
            >
              <span className="drop-shadow-[3px_3px_0px_rgba(255,0,0,0.7)]">
                Teej.
              </span>
              <span className="text-[#11f0d7] absolute -top-4 right-4 text-[3rem] rotate-[20deg] opacity-85 scale-y-140">
                <span className="inline-block origin-bottom -rotate-50">⸾</span>
                <span className="inline-block origin-bottom rotate-0">⸾</span>
                <span className="inline-block origin-bottom rotate-50">⸾</span>
              </span>
              <span className="text-[#11f0d7] absolute bottom-2 left-6 text-[3rem] rotate-[50deg] opacity-85 scale-y-120">
                <span className="inline-block origin-bottom -rotate-70">⸾</span>
                <span className="inline-block origin-bottom rotate-0 scale-y-90 -bottom-30">⸾</span>
                <span className="inline-block origin-bottom rotate-40">⸾</span>
              </span>
            </p>
          }
        />
        <div className=" text-white px-4" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed officiis accusantium quaerat est nemo, natus blanditiis dolore quos quis consequatur debitis sint autem exercitationem consectetur labore, dolorum magnam quo doloremque?
        </div>
      </div>
    );
}