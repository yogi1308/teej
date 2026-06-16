import React, { useRef, useState } from "react";
import AddImage from "./AddImage";
import AddInput from "./AddInput";

export default function AddMusic({
    submitRef,
}: {
    submitRef: React.RefObject<HTMLButtonElement | null>;
}) {
    const audioRef = useRef<HTMLInputElement>(null);

    const [audioName, setAudioName] = useState<string>("Upload track");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("submitted music");
        try {
            const data = new FormData(event.currentTarget);
            console.log(data);
            const response = await fetch('/api/music/', {
                method: 'POST',
                body: data
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Music uploaded successfully:", result);
        } catch (error) {
            console.error("Error from line 20 Addmusic", error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full text-white p-4 gap-8 items-center"
        >
            <div className="flex flex-col flex-1 gap-4">
                <AddImage defaultText={"Upload Cover Art"} />
                <input
                    type="file"
                    name="track"
                    accept="audio/*"
                    className="hidden"
                    ref={audioRef}
                    onChange={(e) => {
                        {
                            setAudioName(e.target.files?.[0]?.name ?? "Upload track");
                        }
                    }}
                    required
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
                    defaultValue={audioName}
                />
                <AddInput
                    label={"Album"}
                    placeholder={"Enter Your Album Name"}
                    type={"text"}
                    name={"album-name"}
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
            <button ref={submitRef} type="submit" className="hidden" />
        </form>
    );
}
