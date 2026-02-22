import TiltedCard from "../components/onlineLibraries/TiltedCard";
import myNameIs from "../assets/bg/a7470465-2ae4-4569-b1fe-a74cbd832fa9.png"

export default function Home() {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center md:flex-row p-4 py-12 pb-4 overflow-hidden ">
        <div className="md:w-[50%] md:h-[100%] h-[50%] w-[100%]">
          <TiltedCard
            className="flex"
            imageSrc={myNameIs}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={12}
            scaleOnHover={1}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent
            overlayContent={
              <p
                className="tilted-card-demo-text relative left-[50%] top-[50%] md:text-[15cqw]! text-[20cqw]! w-[100%]! text-center
                text-[#0320ca] font-marker z-2 opacity-85 font-hand -translate-x-[50%] -translate-y-[40%] drop-shadow-[3px_3px_0px_rgba(255,0,0,0.7)] "
              >
              </p>
            }
          />
        </div>
        <div className=" text-white m-4 h-50% md:w-[50%] md:h-[100%] font-caveat text-[clamp(1.5rem,5vw,3rem)] overflow-auto no-scrollbar content-center mt-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed officiis
          accusantium quaerat est nemo, natus blanditiis dolore quos quis
          consequatur debitis sint autem exercitationem consectetur labore,
          dolorum magnam quo doloremque?
        </div>
      </div>
    );
}