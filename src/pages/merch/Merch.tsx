import Carousel from "@/components/Carousel";
import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState } from "react";

export default function Music() {
    const [content, setContent] = useState([]);
    const [currItem, setCurrItem] = useState(null);
    const [imgtype, setImgType] = useState("Thumbnail");

    useEffect(() => {
        if (currItem?.imageUrl?.length > 1) {
            setImgType("Carousel");
        } else {
            setImgType("Thumbnail");
        }
    }, [currItem]);

    useEffect(() => {
        async function getMerch() {
            try {
                const url = "/api/merch/";
                const res = await fetch(url);
                const body = await res.json();
                setContent(body.data);
            } catch {
                setContent([]);
            }
        }
        getMerch();
    }, []);
    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                {imgtype === "Carousel" ? (
                    <Carousel src={currItem?.imageUrl} style={{ width: "clamp(10rem, 60vh, 60vw)"}} />
                ) : (
                    <Thumbnail src={currItem?.imageUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
                )}
            </div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}
