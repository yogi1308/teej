import Pause from "../assets/svg/Pause";
import SkipNext from "../assets/svg/SkipNext";
import SkipPrevious from "../assets/svg/SkipPrevious";

export function MusicPlayerBar({playing}) {
    return (
        <div className="fixed bottom-4 w-full flex flex-col items-center gap-2">
            <div className="flex flex-col gap-2">
                <p className="text-xl">{playing.title}</p>
                <p>{playing.albumTitle}</p>
            </div>
            <p>
            ------------------------------------------------------------------------------------
            </p>
            <div className="flex">
                <SkipPrevious />
                <Pause />
                <SkipNext />
            </div>
        </div>
    );
}
