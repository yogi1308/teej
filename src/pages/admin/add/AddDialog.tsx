import { useEffect, useRef, useState } from "react";
import AddMerch from "./AddMerch";
import AddBlog from "./AddBlog";
import AddHome from "./AddHome";
import AddSingles from "./AddSingles";
import AddAlbums from "./AddAlbums";
import AddInput from "./AddInput";
import AddImage from "./AddImage";

export default function AddDialog({
    open,
    onClose,
    tab,
    refetch,
}: {
    open: boolean;
    onClose: () => void;
    tab: "Merch" | "Music" | "Blog" | "Home" | "Singles" | "Album";
    refetch?: () => void;
}) {
    const [currTab, setCurrTab] = useState(tab);
    const [singlesSongIds, setSinglesSongIds] = useState([0]);
    const [albumTracksSongsIds, setAlbumTracksSongsIds] = useState([0]);
    const [failedIds, setFailedIds] = useState(new Set<number>());
    const nextId = useRef(1);
    const albumMetaRef = useRef<HTMLFormElement>(null);
    const formRefs = useRef<Map<number, HTMLFormElement>>(new Map());
    const blogFormRef = useRef<HTMLFormElement>(null);
    const merchFormRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (albumTracksSongsIds.length === 0) {
            setAlbumTracksSongsIds([nextId.current++]);
        }
        if (singlesSongIds.length === 0) {
            setSinglesSongIds([nextId.current++]);
        }
    }, [singlesSongIds, albumTracksSongsIds]);

    function updateResults(succeeded: number[], failed: number[]) {
        setSinglesSongIds(prev => prev.filter(id => !succeeded.includes(id)));
        setFailedIds(new Set(failed));
        refetch();
    }

    async function uploadSongs(url: string) {
        const songIds = currTab === "Singles" || currTab === "Music" ? singlesSongIds : currTab === "Album" && albumTracksSongsIds;
        const results = await Promise.all(
            songIds.map(async id => {
                const form = formRefs.current.get(id);
                if (!form) return { id, ok: false };
                try {
                    const res = await fetch(url, {
                        method: "POST",
                        body: new FormData(form),
                    });
                    return { id, ok: res.ok };
                } catch {
                    return { id, ok: false };
                }
            }),
        );
        return {
            succeeded: results.filter(r => r.ok).map(r => r.id),
            failed: results.filter(r => !r.ok).map(r => r.id),
        };
    }

    async function handleSinglesUpload() {
        const { succeeded, failed } = await uploadSongs("/api/music/singles");
        updateResults(succeeded, failed);
    }

    async function handleAlbumsUpload() {
        if (!albumMetaRef.current) return;
        const albumRes = await fetch("/api/music/albums", {
            method: "POST",
            body: new FormData(albumMetaRef.current),
        });
        if (!albumRes.ok) return;
        const { albumId } = await albumRes.json();

        const { succeeded, failed } = await uploadSongs(`/api/music/albums/${albumId}/tracks`);
        updateResults(succeeded, failed);
    }

    async function handleBlogUpload() {
        try {
            const form = blogFormRef.current;
            if (!form) return;
            await fetch("/api/blog", {
                method: "POST",
                body: new FormData(form),
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMerchUpload() {
        try {
            const form = merchFormRef.current;
            if (!form) return;
            await fetch("/api/merch", {
                method: "POST",
                body: new FormData(form),
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpload() {
        if (currTab === "Album") {
            await handleAlbumsUpload();
        } else if (currTab === "Singles" || currTab === "Music") {
            await handleSinglesUpload();
        } else if (currTab === "Blog") {
            await handleBlogUpload();
        } else if (currTab === "Merch") {
            await handleMerchUpload()
        }
    }

    function handleDelete(id: number) {
        setSinglesSongIds(prev => prev.filter(sid => sid !== id));
    }

    function handleAlbumTracksDelete(id: number) {
        setAlbumTracksSongsIds(prev => prev.filter(sid => sid !== id));
    }

    return (
        <>
            {open && <div className="fixed inset-0  backdrop-blur-sm z-[9998]" />}
            <dialog
                className="dialog flex flex-col h-[90vh] w-[80vw] fixed inset-0 m-auto z-[9999] border border-white bg-black text-white overflow-hidden"
                open={open}
            >
                <div className="tabs flex sticky -top-px bg-black justify-around text-center border-b border-white mx-4 divide-x divide-white p-2 font-dots text-md ">
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

                <div className="flex-1 overflow-y-auto">
                    {(currTab === "Singles" || currTab === "Music") &&
                        singlesSongIds.map(id => (
                            <AddSingles
                                key={id}
                                songId={id}
                                failed={failedIds.has(id)}
                                ref={el => {
                                    if (el) formRefs.current.set(id, el);
                                    else formRefs.current.delete(id);
                                }}
                                onDelete={handleDelete}
                            />
                        ))}
                    {currTab === "Album" && (
                        <>
                            <form ref={albumMetaRef} className="flex gap-4 w-full p-4">
                                <AddImage defaultText={"Upload Cover Art"} />
                                <div className="flex-1 flex flex-col gap-4">
                                    <AddInput label={"Album"} placeholder={"Enter Your Album Name"} type={"text"} name={"album"} />
                                    <AddInput label={"Release Date"} placeholder="Release Date" type="date" name="release" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            placeholder={"Add a description..."}
                                            className="flex-1 border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20 resize-none"
                                        />
                                    </div>
                                </div>
                            </form>
                            {albumTracksSongsIds.map(id => (
                                <AddAlbums
                                    key={id}
                                    songId={id}
                                    failed={failedIds.has(id)}
                                    ref={el => {
                                        if (el) formRefs.current.set(id, el);
                                        else formRefs.current.delete(id);
                                    }}
                                    onDelete={handleAlbumTracksDelete} />
                            ))}
                        </>
                    )}
                    {currTab == "Merch" && <AddMerch merchFormRef={merchFormRef} />}
                    {currTab == "Blog" && <AddBlog blogFormRef={blogFormRef} />}
                    {currTab == "Home" && <AddHome />}
                </div>

                <div className="flex sticky bg-black mt-auto bottom-0 text-center font-dots text-md justify-center w-full self-center">
                    <div className="flex sticky bg-black mt-auto bottom-0 text-center divide-x divide-white font-dots text-md justify-center border-t w-fit self-center">
                        <button className="cursor-pointer px-20 py-1 mb-1" onClick={() => handleUpload()}>
                            Upload
                        </button>
                        {(currTab === "Album" || currTab === "Singles" || currTab === "Music") && (
                            <button
                                className="cursor-pointer px-20 py-1 mb-1"
                                onClick={() => {
                                    if (currTab === "Singles" || currTab === "Music") setSinglesSongIds(prev => [...prev, nextId.current++]);
                                    else setAlbumTracksSongsIds(prev => [...prev, nextId.current++]);
                                }}
                            >
                                {currTab === "Album" ? "Add more tracks" : "Add More"}
                            </button>
                        )}
                        <button className="cursor-pointer px-20 py-1 mb-1" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
