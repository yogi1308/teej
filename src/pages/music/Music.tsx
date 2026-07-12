import MainContent from "@/components/MainContent";
import { useEffect, useState } from "react";

export default function Music() {
    const [content, setContent] = useState([]);
    const [currItem, setCurrItem] = useState([]);
    useEffect(() => {
        async function getMusic() {
            try {
                const url = "/api/music/";
                const res = await fetch(url);
                const body = await res.json();
                if (body.data?.tracks) {
                    setContent(
                        body.data.tracks.map(t => ({
                            ...t,
                            coverUrl: t.imageUrl ?? body.data.coverUrl,
                            albumTitle: body.data.title,
                        })),
                    );
                } else {
                    setContent(body.data ?? []);
                }
            } catch {
                setContent([]);
            }
        }
        getMusic();
    }, []);
    return (
        <div>
            <MainContent content={content} currItem={currItem} setCurrItem={setCurrItem} />
        </div>
    );
}
