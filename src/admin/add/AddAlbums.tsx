import { forwardRef, useRef, useState } from "react";
import AddImage from "./AddImage";
import AddInput from "./AddInput";

const AddSingles = forwardRef<
    HTMLFormElement,
    { songId: number; failed: boolean }
>(({ songId, failed }, ref) => {
    const audioRef = useRef<HTMLInputElement>(null);

    const [audioName, setAudioName] = useState<string | null>(null);

    return (
        <form
            ref={ref}
            data-song-id={songId}
            className={`flex w-full text-white p-4 gap-8 items-center ${failed ? "border border-red-500" : ""}`}
        >
            <input
                type="file"
                name="track"
                accept="audio/*"
                className="hidden"
                ref={audioRef}
                onChange={(e) => {
                    setAudioName(e.target.files?.[0]?.name ?? null);
                }}
                required
            />
            <button
                onClick={() => audioRef.current?.click()}
                className="border border-dashed border-black py-2 bg-white text-black"
            >
                {audioName ?? "Upload Track"}
            </button>
            <div className="flex flex-col flex-1 gap-4">
                <AddInput
                    label={"Track Name"}
                    placeholder={"Enter Your Track Name"}
                    type={"text"}
                    name={"title"}
                    defaultValue={audioName}
                />
            </div>
        </form>
    );
});

export default AddSingles;
