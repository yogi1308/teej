import { useState } from "react";
import { MusicPlayerBar } from "./MusicPlayerBar";
import { usePlayer } from "@/hooks/usePlayer";

export default function AudioPlayer({ content, playing, setPlaying, isPlaying, setIsPlaying, audioRef }) {
    const [currentTime, setCurrentTime] = useState(0);
    const { setPlayingLink } = usePlayer();

    function onNext() {
        const idx = content.findIndex(c => c.id === playing?.id);
        const next = content.slice(idx + 1).find(c => c.songUrl) ?? content.find(c => c.songUrl);
        setIsPlaying(true);
        // scrollToItem(next);
        setPlaying(next);
    }

    function onPrevious() {
        const idx = content.findIndex(c => c.id === playing?.id);
        const prev =
            content
                .slice(0, idx)
                .reverse()
                .find(c => c.songUrl) ?? content.toReversed().find(c => c.songUrl);
        setIsPlaying(true);
        // scrollToItem(prev);
        setPlaying(prev);
    }

    return (
        <>
            {playing !== null && (
                <MusicPlayerBar
                    playing={playing}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    onToggle={() => {
                        const a = audioRef.current;
                        if (a) a.paused ? a.play() : a.pause();
                    }}
                    onSeek={t => {
                        const a = audioRef.current;
                        if (a) {
                            a.currentTime = t;
                            setCurrentTime(t);
                        }
                    }}
                    onNext={onNext}
                    onPrevious={onPrevious}
                />
            )}
            <audio
                ref={audioRef}
                src={playing?.songUrl ?? ""}
                onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </>
    );
}
