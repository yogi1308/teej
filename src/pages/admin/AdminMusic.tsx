import Thumbnail from "@/components/Thumbnail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import AdminMainContent from "@/components/AdminMainContext";

export default function Music() {
    const { musicId } = useParams();
    const url = musicId ? `/api/music/albums/${musicId}` : "/api/music/";
    const { data: data, loading, error, refetch } = useFetch(url);
    useEffect(() => {
        const handler = () => refetch();
        window.addEventListener("refetch-admin", handler);
        return () => window.removeEventListener("refetch-admin", handler);
    }, [refetch]);
    const content = Array.isArray(data) ? data : data?.tracks ?? [];
    const [currItem, setCurrItem] = useState([]);
    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <AdminMainContent content={content} loading={loading} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}
