import Pause from "../assets/svg/Pause";
import PlayArrow from "../assets/svg/PlayArrow";
import SkipNext from "../assets/svg/SkipNext";
import SkipPrevious from "../assets/svg/SkipPrevious";

export function MusicPlayerBar({
    playing,
    currentTime,
    isPlaying,
    onToggle,
    onSeek,
    onNext,
    onPrevious,
}) {
    function formatTime(s) {
        if (!s || isNaN(s)) return "0:00";
        return `${Math.floor(s / 60)}:${Math.floor(s % 60)
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-12 py-4 flex flex-col items-center gap-2 border border-white">
            {/* <div className="flex flex-col gap-2"> */}
            {/*     <p className="text-xl">{playing.title}</p> */}
            {/*     <p>{playing.albumTitle}</p> */}
            {/* </div> */}
            <p className="text-white">
                <span className="text-xl">{playing.title}</span>
                <span className="text-white/50 "> / {playing.albumTitle}</span>
            </p>
            <div className="flex gap-2">
                <p>{formatTime(currentTime)}</p>
                <div
                    className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        onSeek(((e.clientX - r.left) / r.width) * playing.meta);
                    }}
                >
                    <div
                        className="h-full bg-yellow rounded-full"
                        style={{
                            width: playing.meta
                                ? `${(currentTime / playing.meta) * 100}%`
                                : "0%",
                        }}
                    />
                </div>
                <p>{playing.meta}</p>
            </div>
            <div className="flex gap-8">
                <button onClick={onPrevious} className="scale-150">
                    <SkipPrevious />
                </button>
                <button onClick={onToggle} className="scale-150">
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </button>
                <button onClick={onNext} className="scale-150">
                    <SkipNext />
                </button>
            </div>
        </div>
    );
}
