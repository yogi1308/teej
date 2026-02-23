import TiltedCard from "../components/onlineLibraries/TiltedCard";
import myNameIs from "../assets/bg/a7470465-2ae4-4569-b1fe-a74cbd832fa9.png";

export default function Home() {
  return (
    <div className="bg-black w-screen h-screen flex items-center overflow-y-auto no-scrollbar md:flex-row flex-col pt-12 gap-4">
      <div className="md:translate-y-0 translate-y-[10%]">
        <TiltedCard
          imageSrc={myNameIs}
          imageClassName="
              h-[100%]!
              min-w-[100vw]!
              md:h-[clamp(20rem,50vw,40vw)]!
              md:min-w-[clamp(20rem,50vw,40vw)]!
              fixed! left-0! -translate-x-[25%] 
              md:translate-y-[10%]
              md:-translate-x-[0%]! 
            "
          containerHeight="min-content"
          containerWidth="min-content"
          imageHeight="clamp(10rem, 50vw, 90vw)"
          imageWidth="clamp(10rem, 50vw, 90vw)"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent
          overlayContent={<p> </p>}
        />
      </div>
      <p className="text-white font-caveat text-[clamp(2rem,3.5cqw,5rem)] md:pr-4 px-8 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        magni eligendi voluptatibus debitis esse, sequi optio. Voluptas amet
        unde odit dicta in nisi repudiandae, accusantium tempore fugiat enim nam
        vero.
      </p>
    </div>
  );
}
