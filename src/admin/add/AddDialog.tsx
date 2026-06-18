import { useEffect, useRef, useState } from "react";
import AddMusic from "./AddMusic";
import AddMerch from "./AddMerch";
import AddBlog from "./AddBlog";
import AddHome from "./AddHome";
import AddSingles from "./AddSingles";
import AddAlbums from "./AddAlbums";
import AddInput from "./AddInput";
import AddImage from "./AddImage";

export default function AddDialog({
    dialogRef,
    tab,
    refetch,
}: {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    tab: "Merch" | "Music" | "Blog" | "Home" | "Singles" | "Album";
    refetch: () => void;
}) {
    const [currTab, setCurrTab] = useState(tab);
    const [songIds, setSongIds] = useState([0]);
    const [failedIds, setFailedIds] = useState(new Set<number>());
    const nextId = useRef(1);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    useEffect(() => {
        if (songIds.length === 0) {
            setSongIds([nextId.current++]);
        }
    }, [songIds]);

    async function uploadSong(id: number) {
        const form = formRefs.current.get(id);
        if (!form) return false;
        try {
            const res = await fetch("/api/music/upload", {
                method: "POST",
                body: new FormData(form),
            });
            return res.ok;
        } catch {
            return false;
        }
    }

    async function handleUpload() {
        const results = await Promise.all(
            songIds.map(async (id) => ({
                id,
                ok: await uploadSong(id),
            })),
        );

        const succeeded = results.filter((r) => r.ok).map((r) => r.id);
        const failed = results.filter((r) => !r.ok).map((r) => r.id);

        setSongIds((prev) => prev.filter((id) => !succeeded.includes(id)));
        setFailedIds(new Set(failed));
        refetch();
    }

    function handleDelete(id:number) {
        setSongIds(prev => prev.filter((sid) => sid !== id))
    }

    return (
        <dialog
            className="dialog relative flex flex-col h-[90vh] w-[80vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-black text-white "
            ref={dialogRef}
        >
            <div className="tabs flex sticky top-[-1px] bg-black justify-around text-center border-b border-white mx-4 divide-x divide-white p-2 font-dots text-md ">
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Home" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Home")}
                >
                    Home
                </p>
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Album" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Album")}
                >
                    Album
                </p>
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Singles" || currTab === "Music" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Singles")}
                >
                    Singles
                </p>
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Merch" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Merch")}
                >
                    Merch
                </p>
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Blog" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Blog")}
                >
                    Blog
                </p>
            </div>

            {(currTab === "Singles" || currTab === "Music") &&
                songIds.map((id) => (
                    <AddSingles
                        key={id}
                        songId={id}
                        failed={failedIds.has(id)}
                        ref={(el) => {
                            if (el) formRefs.current.set(id, el);
                            else formRefs.current.delete(id);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            {currTab === "Album" && (
                <>
                    <div className="flex flex-row p-4 w-full gap-4">
                        <AddImage defaultText={"Upload Cover Art"} />
                        <div className="flex-1 flex flex-col gap-4">
                            <AddInput
                                label={"Album"}
                                placeholder={"Enter Your Album Name"}
                                type={"text"}
                                name={"album"}
                            />
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-white/50 text-sm uppercase tracking-widest">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder={"Add a description..."}
                                    className="flex-1 border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                    {songIds.map((id) => (
                        <AddAlbums
                            key={id}
                            songId={id}
                            failed={failedIds.has(id)}
                            ref={(el) => {
                                if (el) formRefs.current.set(id, el);
                                else formRefs.current.delete(id);
                            }}
                        onDelete={handleDelete}
                        />
                    ))}
                </>
            )}
            {/* {currTab == "Music" && */}
            {/*     songIds.map((id) => ( */}
            {/*         <AddMusic */}
            {/*             key={id} */}
            {/*             songId={id} */}
            {/*             failed={failedIds.has(id)} */}
            {/*             ref={(el) => { */}
            {/*                 if (el) formRefs.current.set(id, el); */}
            {/*                 else formRefs.current.delete(id); */}
            {/*             }} */}
            {currTab == "Merch" && <AddMerch />}
            {currTab == "Blog" && <AddBlog />}
            {currTab == "Home" && <AddHome />}

            <div className="flex sticky bg-black mt-auto bottom-0 text-center font-dots text-md justify-center w-full self-center">
                <div className="flex sticky bg-black mt-auto bottom-0 text-center divide-x divide-white font-dots text-md justify-center border-t w-fit self-center">
                    <button
                        className="cursor-pointer px-20 py-1 mb-1"
                        onClick={() => handleUpload()}
                    >
                        Upload
                    </button>
                    <button
                        className="cursor-pointer px-20 py-1 mb-1"
                        onClick={() => setSongIds((prev) => [...prev, nextId.current++])}
                    >
                        {currTab === "Album" ? "Add more tracks" : "Add More"}
                    </button>
                    <button
                        className="cursor-pointer px-20 py-1 mb-1"
                        onClick={() => {
                            dialogRef.current?.close();
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
}
