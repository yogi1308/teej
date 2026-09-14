import Carousel from "@/components/Carousel";
import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import EmptyState from "@/components/EmptyState";

export default function Merch() {
    const { data: content, loading, error } = useFetch("/api/merch/");
    const [currItem, setCurrItem] = useState(null);

    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                {currItem?.imageUrl?.length > 1 ? (
                    <Carousel src={currItem?.imageUrl} style={{ width: "clamp(10rem, 60vh, 60vw)" }} />
                ) : (
                    <Thumbnail src={currItem?.imageUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
                )}
            </div>
            {content?.length === 0 ? <EmptyState /> :
                <MainContent content={content} loading={loading} currItem={currItem} setCurrItem={setCurrItem} />
            }
        </div>
    );
}
