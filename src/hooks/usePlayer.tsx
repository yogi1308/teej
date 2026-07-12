import { createContext, useContext, useState } from "react";

type PlayerContext = {
    playingLink: string | null;
    setPlayingLink: (link: string | null) => void;
};

const PlayerCtx = createContext<PlayerContext>({
    playingLink: null,
    setPlayingLink: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [playingLink, setPlayingLink] = useState<string | null>(null);
    return (
        <PlayerCtx.Provider value={{ playingLink, setPlayingLink }}>
            {children}
        </PlayerCtx.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerCtx);
}

