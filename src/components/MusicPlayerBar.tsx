import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
    const total = playing.meta?.split(":").reduce((m, s) => m * 60 + +s, 0) ?? 0;

    function formatTime(s) {
        if (!s || isNaN(s)) return "0:00";
        return `${Math.floor(s / 60)}:${Math.floor(s % 60)
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-4 flex flex-col items-center gap-2 border border-white w-[99vw] bg-black/60">
            <p className="text-white">
                <span className="text-xl">{playing.title}</span>
                { playing.albumTtitle && 
                    <span className="text-white/50 "> / {playing.albumTitle}</span>
                }
            </p>
            <Slider
                value={currentTime}
                min={0}
                max={total || 1}
                step={0.1}
                onChange={onSeek}
                trackStyle={{ background: "white", height: 1, borderRadius: 0 }}
                railStyle={{
                    background: "rgba(255,255,255,0.15)",
                    height: 1,
                    borderRadius: 0,
                }}
                handleStyle={{ display: "none" }}
            />
            <div className="flex justify-between w-full">
                <p className="text-white/50 shrink-0">{formatTime(currentTime)}</p>
                <div className="flex gap-4">
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
                <p className="text-white/50 shrink-0">{playing.meta}</p>
            </div>
        </div>
    );
}

