import Carousel from "@/components/Carousel";
import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Music() {
    const { data: content } = useFetch("/api/merch/");
    const [currItem, setCurrItem] = useState(null);
    const [imgtype, setImgType] = useState("Thumbnail");

    useEffect(() => {
        if (currItem?.imageUrl?.length > 1) {
            setImgType("Carousel");
        } else {
            setImgType("Thumbnail");
        }
    }, [currItem]);
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
