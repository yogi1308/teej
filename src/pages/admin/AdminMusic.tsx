import MainContent from "@/components/MainContent";
import Thumbnail from "@/components/Thumbnail";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import Add from "./add/Add";

export default function Music() {
    const { musicId } = useParams();
    const url = musicId ? `/api/music/albums/${musicId}` : "/api/music/";
    const { data } = useFetch(url);
    const content = Array.isArray(data) ? data : data?.tracks ?? [];
    const [currItem, setCurrItem] = useState([]);
    return (
        <div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <Thumbnail src={currItem?.imageUrl || currItem?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
            </div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
            <Add tab={"Music"} />
        </div>
    );
}
