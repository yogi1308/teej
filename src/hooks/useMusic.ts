import { useMemo } from "react";
import useFetch from "./useFetch";

export function useMusic(albumId?: string) {
    const url = albumId ? `/api/music/albums/${albumId}` : "/api/music/";
    const { data, ...rest } = useFetch(url);

    const music = useMemo(() => {
        if (!data) return null;
        if (data.tracks) {
            return data.tracks.map(t => ({
                ...t,
                coverUrl: t.imageUrl ?? data.coverUrl,
                albumTitle: data.title,
            }));
        }
        return data ?? [];
    }, [data]);

    return { music, ...rest };
}
