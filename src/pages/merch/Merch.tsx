import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState } from "react";

export default function Music() {
    const [content, setContent] = useState([]);
    const [currItem, setCurrItem] = useState([]);
    useEffect(() => {
        async function getMerch() {
            try {
                const url = "/api/merch/";
                const res = await fetch(url);
                const body = await res.json();
                setContent(body.data)
            } catch {
                setContent([]);
            }
        }
        getMerch();
    }, []);
    return (
        <div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}

