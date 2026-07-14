import fetchJSON from "@/lib/api";
import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchJSON(url);
            setData(res);
            return res;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load()
    }, [url])

    return {data, loading, error, refetch: load}
}
