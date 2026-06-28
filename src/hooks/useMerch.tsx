import { useState, useEffect } from "react";

export function useMerch(merchId?: string) {
    const [merch, setMerch] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const url = merchId ? `/api/merch/${merchId}` : "/api/merch/";
                const res = await fetch(url);
                const body = await res.json();
                setMerch(body.data);
            } catch {
                setMerch([]);
            }
        })();
    }, [merchId]);

    async function refetch() {
        try {
            const url = merchId ? `/api/merch/${merchId}` : "/api/merch/";
            const res = await fetch(url);
            const body = await res.json();
            setMerch(body.data);
        } catch {
            setMerch([]);
        }
    }

    return { merch, refetch };
}

