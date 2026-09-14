import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import AdminMainContent from "@/components/AdminMainContext";
import EmptyState from "@/components/EmptyState";

export default function Blog() {
    const { data: content, loading, error, refetch } = useFetch("/api/blog/");
    useEffect(() => {
        const handler = () => refetch();
        window.addEventListener("refetch-admin", handler);
        return () => window.removeEventListener("refetch-admin", handler);
    }, [refetch]);
    const [currItem, setCurrItem] = useState([]);

    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            {content?.length === 0 ? <EmptyState /> :
                <AdminMainContent content={content} loading={loading} currItem={currItem} setCurrItem={setCurrItem} />
            }
        </div>
    );
}
