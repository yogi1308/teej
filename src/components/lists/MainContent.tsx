import { useState, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import PlayArrow from "../../assets/svg/PlayArrow";

export default function MainContent({
  music,
}: {
  music: { id: number; title: string; duration: string }[];
}) {
  const [currSong, setCurrSong] = useState(music[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const firstItem = containerRef.current?.querySelector(
      ".song",
    ) as HTMLElement;
    if (!firstItem) return;

    const itemHeight = firstItem.offsetHeight;
    const gap = 8;
    const totalStep = itemHeight + gap;
    const targetIndex = Math.floor(latest / totalStep);

    if (targetIndex >= 0 && targetIndex < music.length) {
      const exitedSong = music[targetIndex];

      if (exitedSong.id !== currSong.id) {
        setCurrSong(exitedSong);
      }
    } else if (targetIndex < 0) {
      setCurrSong(music[0]);
    }
  });

  const toTop = (e: React.MouseEvent<HTMLLIElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const element = e.currentTarget;

    container.scrollTo({
      top: element.offsetTop + 8,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="music-list text-white w-screen font-dots absolute top-[50vh] h-[50vh] overflow-auto scrollbar-hide px-4 z-5"
    >
      <div className="flex justify-between fixed top-[calc(50vh-1.2rem)] z-2 w-[calc(100vw-2rem)] mr-8 border-t border-b py-2 px-4 bg-[rgba(0,0,0,0.4)]">
        <p className="text-yellow"> {currSong.title} </p>
        <div className="text-red flex gap-2 items-center">
          <span>{currSong.duration}</span>
          <PlayArrow />
        </div>
      </div>

      <ul className="pb-[calc(50vh+1.2rem)] flex flex-col gap-2 pt-0 after:fixed after:inset-0 after:content-[''] after:pointer-events-none after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_85%,rgba(0,0,0,0.95)_100%)]">
        {music.map((song) => (
          <li
            key={song.id}
            className={`song flex justify-between p-1 px-4 opacity-80 transition-all duration-300 ease-in-out drop-shadow-[0_3px_3px_rgb(0,0,0)] hover:relative
              hover:scale-101 hover:opacity-100 hover:z-10 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer ${song.id === 0 ? "invisible" : ""}
            `}
            onClick={toTop}
          >
            <p
              className={`transition-all duration-300 ease-in-out text-yellow ${song.id === currSong.id && "opacity-0"}`}
            >
              {song.title}
            </p>
            <p
              className={` transition-all duration-300 ease-in-out text-red pr-8 ${song.id === currSong.id && "opacity-0"}`}
            >
              {song.duration}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
