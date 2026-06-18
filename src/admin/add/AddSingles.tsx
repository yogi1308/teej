import { forwardRef, useRef, useState } from "react";
import AddImage from "./AddImage";
import AddInput from "./AddInput";
import Delete from "../../assets/svg/Delete";

const AddSingles = forwardRef<
    HTMLFormElement,
    { songId: number; failed: boolean; onDelete: (id: number) => void }
>(({ songId, failed, onDelete }, ref) => {
    const audioRef = useRef<HTMLInputElement>(null);

    const [audioName, setAudioName] = useState<string | null>(null);

    return (
        <form
            ref={ref}
            data-song-id={songId}
            className={`flex w-full text-white p-4 gap-8 items-center ${failed ? "border border-red-500" : ""}`}
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
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <AddInput
                    label={"Track Name"}
                    placeholder={"Enter Your Track Name"}
                    type={"text"}
                    name={"title"}
                    defaultValue={audioName}
                />
                <AddInput
                    label={"Release Date"}
                    placeholder="Release Date"
                    type="date"
                    name="release"
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
                        name="description"
                        placeholder={"Add a description..."}
                        rows={5}
                        className="border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20"
                    />
                </div>
            </div>
            <button className="scale-[1.1] hover:scale-[1.2]" onClick={() => onDelete(songId)}>
                <Delete />
            </button>
        </form>
    );
});

export default AddSingles;
