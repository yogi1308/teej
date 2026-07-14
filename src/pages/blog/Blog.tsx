import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState } from "react";
import { useBlog } from "../hooks/useBlog";

export default function Music() {
    const { data: content } = useBlog();
    const [currItem, setCurrItem] = useState([]);
    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}

