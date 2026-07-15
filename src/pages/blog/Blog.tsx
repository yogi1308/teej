import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function Blog() {
    const { data: content, loading, error } = useFetch("/api/blog/");
    const [currItem, setCurrItem] = useState([]);

    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <MainContent content={content} loading={loading} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}
