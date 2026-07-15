import { forwardRef, useRef, useState } from "react";
import AddInput from "./AddInput";
import Delete from "@/assets/svg/Delete";

const AddAlbums = forwardRef<HTMLFormElement, { songId: number; failed: boolean; onDelete: (id: number) => void }>(
    ({ songId, failed, onDelete }, ref) => {
        const audioRef = useRef<HTMLInputElement>(null);

        const [audioName, setAudioName] = useState<string | null>(null);

        return (
            <form
                ref={ref}
                data-song-id={songId}
                className={`flex w-full p-4 gap-8 items-center ${failed ? "border border-red-500" : ""} items-end`}
            >
                <input
                    type="file"
                    name="track"
                    accept="audio/*"
                    className="hidden"
                    ref={audioRef}
                    onChange={e => {
                        setAudioName(e.target.files?.[0]?.name ?? null);
                    }}
                    required
                />
                <button
                    type="button"
                    onClick={() => audioRef.current?.click()}
                    className="border border-dashed border-black py-2 bg-white text-black px-4"
                >
                    {audioName ?? "Upload Track"}
                </button>
                <div className="flex flex-col flex-1 gap-4">
                    <div className="flex gap-8">
                        <div className="flex-1">
                            <AddInput label={"Track Name"} placeholder={"Enter Your Track Name"} type={"text"} name={"title"} defaultValue={audioName} />
                        </div>
                        <div className="flex-1">
                            <AddInput label={"Link"} placeholder={"Link Your Track"} type={"url"} name={"link"} />
                        </div>
                    </div>
                </div>
                <button type="button" className="scale-[1.1] hover:scale-[1.2]" onClick={() => onDelete(songId)}>
                    <Delete />
                </button>
            </form>
        );
    },
);

export default AddAlbums;
