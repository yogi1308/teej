import { useRef, useState } from "react";
import AddImage from "./AddImage";
import AddInput from "./AddInput";

export default function AddMusic() {
    const audioRef = useRef<HTMLInputElement>(null);
    const [audioName, setAudioName] = useState<string>("Upload track");
    return (
        <div className="flex w-full text-white p-4 gap-8 items-center">
            <div className="flex flex-col flex-1 gap-4">
                <AddImage defaultText={"Upload Cover Art"} />
                <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    ref={audioRef}
                    onChange={(e) =>
                        setAudioName(e.target.files?.[0]?.name ?? "Upload track")
                    }
                />
                <button
                    onClick={() => audioRef.current?.click()}
                    className="border border-dashed border-black py-2 bg-white text-black"
                >
                    {audioName ?? "Upload Audio"}
                </button>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <AddInput
                    label={"Track Name"}
                    placeholder={"Enter Your Track Name"}
                    type={"text"}
                    name={"track-name"}
                />
                <AddInput
                    label={"Album"}
                    placeholder={"Enter Your Album Name"}
                    type={"text"}
                    name={"album-name"}
                    defaultValue={"Single"}
                />
                <AddInput
                    label={"Release Date"}
                    placeholder="Release Date"
                    type="date"
                    name="release-date"
                />
                <AddInput
                    label={"Link"}
                    placeholder={"Link Your Track"}
                    type={"url"}
                    name={"link"}
                />
                <div className="flex flex-col gap-1">
                    <label className="text-white/50 text-sm uppercase tracking-widest">
                       Description 
                    </label>
                    <textarea
                        placeholder={"Add a description..."}
                        rows={5}
                        className="border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20"
                    />
                </div>
            </div>
        </div>
    );
}
