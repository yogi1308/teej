import { useState, useEffect } from "react";

export function useMusic(albumId?: string) {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        const url = albumId ? `/api/music/albums/${albumId}` : "/api/music/";

        fetch(url)
            .then((r) => r.json())
            .then((body) => {
                if (body.data?.tracks) {
                    setMusic(
                        body.data.tracks.map((t) => ({
                            ...t,
                            coverUrl: t.imageUrl ?? body.data.coverUrl,
                        })),
                    );
                } else {
                    setMusic(body.data ?? []);
                }
            })
            .catch(() => setMusic([]));
    }, [albumId]);

    async function refetch() {
        try {
            const url = albumId ? `/api/music/albums/${albumId}` : "/api/music/";
            const res = await fetch(url);
            const body = await res.json();
            if (body.data?.tracks) {
                setMusic(
                    body.data.tracks.map((t) => ({
                        ...t,
                        coverUrl: t.imageUrl ?? body.data.coverUrl,
                    })),
                );
            } else {
                setMusic(body.data ?? []);
            }
        } catch {
            setMusic([]);
        }
    }

    return { music, refetch };
}
