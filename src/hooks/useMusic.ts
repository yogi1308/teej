import { useState, useEffect } from "react";

export function useMusic() {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        fetch("/api/music/get")
            .then(r => r.json())
            .then(body => setMusic(body.data ?? []))
            .catch(() => setMusic([]));
    }, []);

    async function refetch() {
        try {
            const res = await fetch("/api/music/get");
            const body = await res.json();
            setMusic(body.data ?? []);
        } catch {
            setMusic([]);
        }
    }

    return { music, refetch };
}
