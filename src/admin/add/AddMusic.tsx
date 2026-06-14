import { useRef, useState } from "react";
import AddImage from "./AddImage";

export default function AddMusic() {
    const audioRef = useRef<HTMLInputElement>(null);
    const [audioName, setAudioName] = useState<string>("Upload track");
    return (
        <div className="flex w-full h-full text-white p-4 gap-4 items-center">
            <div className="flex flex-col flex-1 gap-4">
                <AddImage defaultText={"Upload Cover Art"} />
                <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    ref={audioRef}
                    onChange={(e) => setAudioName(e.target.files?.[0]?.name ?? "Upload track")}
                />
                <button
                    onClick={() => audioRef.current?.click()}
                    className="border border-dashed border-black py-2 bg-white text-black"
                >
                    {audioName ?? "Upload Audio"}
                </button>
            </div>
            <div className="flex flex-col flex-1">
                <input type="text" name="track-name" id="" />
                <input type="text" name="album" id="" />
                <input type="url" name="link" id="" />
            </div>
        </div>
    );
}
