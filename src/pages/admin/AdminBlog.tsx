import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Add from "./add/Add";

export default function Blog() {
    const { data: content } = useFetch("/api/blog/");
    const [currItem, setCurrItem] = useState([]);

    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
            <Add tab={"Blog"} />
        </div>
    );
}
