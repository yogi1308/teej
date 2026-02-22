import MusicNote from "../../assets/svg/MusicNote";
import { useState, useRef, forwardRef } from "react";

const Navigator = forwardRef<
  HTMLDialogElement,
  { setNavigatorVisibility: React.Dispatch<React.SetStateAction<boolean>> }
>(({ setNavigatorVisibility }, ref) => {
  const items = ["Home", "Music", "Merch", "Blog"];

  const [rotation, setRotation] = useState(0);
  const [leftMost, setLeftMost] = useState("Music");
  const dragging = useRef(false);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const lastAngle = useRef<number>(0);

  const getAngle = (clientX: number, clientY: number): number => {
    if (!circleRef.current) {
      return 0; // safe fallback
    }

    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastAngle.current = getAngle(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const currentAngle = getAngle(e.clientX, e.clientY);
    const delta = currentAngle - lastAngle.current;

    setRotation((prev) => prev + delta);
    lastAngle.current = currentAngle;
  };

  const toggleNavigatorVisibility = () =>
    setNavigatorVisibility((visibility: boolean) => !visibility);

  const rotateToItem = (index: number) => {
    const target = 0 - index * (180 / items.length);

    let frame: number;

    const animate = () => {
      setRotation((prev) => {
        const diff = target - prev;

        if (Math.abs(diff) < 0.5) {
          cancelAnimationFrame(frame);

          // snap exactly to target
          setTimeout(() => {
            setNavigatorVisibility(() => false);
          }, 100);

          return target;
        }

        return prev + diff * 0.15;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
  };
  

  return (
    <dialog
      ref={ref}
      className="navigator select-none hidden overflow-hidden h-100 w-80 font-dots absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white z-6 border border-white p-8 origin-center"
    >
      <div className="flex justify-between gap-4 bg-black absolute text-center p-2 border-white border-2 left-[50%] -translate-x-1/2 min-w-[calc(100%-2rem)] ">
        <MusicNote />
        <p>{leftMost}</p>
        <p onClick={toggleNavigatorVisibility} className="cursor-pointer">
          {" "}
          ×{" "}
        </p>
      </div>
      <div className="absolute top-[55%] left-[calc(50%-4rem)] -translate-x-1/2 -translate-y-1/2 z-1 select-none">
        ●
      </div>
      <div
        className="flex justify-between border border-white w-32 h-32 rounded-full absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center cursor-grab"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        style={{ transform: `rotate(0deg) rotate(${rotation}deg)` }}
        ref={circleRef}
      >
        {items.map((item, i) => {
          const angle = (180 / items.length) * i; // fixed position
          const effectiveAngle = (rotation + angle + 360) % 360; // normalize 0–360

          if (Math.abs(effectiveAngle) < 10) {
            setLeftMost(`${item}`);
          }

          return (
            <p
              key={i}
              className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none hover:opacity-80 cursor-pointer"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(-110px)
                `,
                opacity: leftMost === item ? 1 : 0.4,
              }}
              onClick={() => rotateToItem(i)}
            >
              {item}
            </p>
          );
        })}
      </div>
      <div className=" border border-white w-12 h-12 rounded-full absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
      <div className="border border-white absolute bottom-[10%] w-[calc(100%-4rem)]"></div>
    </dialog>
  );
});

Navigator.displayName = "Navigator";
export default Navigator;
