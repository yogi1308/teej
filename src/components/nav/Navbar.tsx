import MusicNote from "../../assets/svg/MusicNote";
import ThreeDots from "../../assets/svg/ThreeDots";

export default function Navbar({ onClick }: { onClick?: () => void }) {
  return (
    <nav
      onClick={onClick ?? (() => {})}
      className="flex cursor-pointer justify-between gap-8 -dots bg-black absolute text-center p-2 w-[calc(100% + 10rem)] border-white border-2 left-[50%] -translate-x-1/2"
    >
      <MusicNote />
      <p>Music</p>
      <ThreeDots />
    </nav>
  );
}
