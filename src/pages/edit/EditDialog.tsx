import { useEffect, useRef, useState } from "react";
import AddInput from "../admin/add/AddInput";
import SleekLeftArrow from "@/assets/svg/SleekLeftArrow";
import Delete from "@/assets/svg/Delete";
import EditSVG from "@/assets/svg/Edit";
import TipTap from "@/components/TipTap";

const imgs = (item: Record<string, any>) => {
    const urls = item.imageUrl ?? item.coverUrl;
    if (!urls) return [];
    return Array.isArray(urls) ? urls : [urls];
};

export default function EditDialog({
    dialogRef,
    item,
    onClose,
}: {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    item: Record<string, any> | null;
    onClose: () => void;
}) {
    if (!item) return null;
    const inputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLInputElement>(null);
    const replaceRef = useRef(-1);
    const [currImgPos, setCurrImgPos] = useState(0);
    const images = imgs(item);
    const [imgsChange, setImgsChange] = useState(false);
    const [imgsUrl, setImgsUrl] = useState(images);
    const [songsChange, setSongsChange] = useState(false);
    const [blogUploadtype, setBlogUploadType] = useState<"upload" | "type">("upload");
    const [editorContent, setEditorContent] = useState("");
    const [toast, setToast] = useState<string | null>(null);
    useEffect(() => {
        if (!toast) return;
        const id = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(id);
    }, [toast]);
    useEffect(() => {
        setImgsChange(true);
    }, [imgs]);
    useEffect(() => {
        const fresh = imgs(item);
        setImgsUrl(fresh);
        setCurrImgPos(0);
        setImgsChange(false);
        setSongsChange(false);
    }, [item]);
    useEffect(() => {
        if (item.type !== "blog" || !item.contentUrl) return;
        setEditorContent("");
        fetch(item.contentUrl)
            .then(res => res.text())
            .then(html => setEditorContent(html))
            .catch(() => {});
    }, [item]);

    const allowedKeys = ["title", "description", "sizes", "inStock", "meta", "subtitle", "link", "releaseDate"];
    return (
        <dialog
            className="dialog flex-col bg-black/50 overflow-hidden p-4 pb-0 backdrop-blur-md max-w-[80vw]! gap-4 min-h-40 fixed inset-0 m-auto border border-white"
            ref={dialogRef}
        >
            <div className="flex gap-4 items-center">
                {imgsUrl.length > 0 ? (
                    <div className="relative flex flex-col gap-4">
                        {imgsUrl.length > 1 && currImgPos !== 0 && (
                            <div
                                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full z-10"
                                onClick={() => setCurrImgPos(prev => prev - 1)}
                            >
                                <SleekLeftArrow />
                            </div>
                        )}
                        <div className="relative border border-dashed border-white object-cover w-full">
                            <input
                                type="file"
                                ref={inputRef}
                                accept="image/*"
                                className="hidden"
                                name="images"
                                required
                                multiple
                                onChange={e => {
                                    const urls = Array.from(e.target.files!).map(f => URL.createObjectURL(f));
                                    const idx = replaceRef.current;
                                    replaceRef.current = -1;
                                    if (idx >= 0) {
                                        setImgsUrl(prev => {
                                            const next = [...prev];
                                            next[idx] = urls[0];
                                            return next;
                                        });
                                    } else {
                                        setImgsUrl(prev => [...prev, ...urls]);
                                    }
                                }}
                            />
                            <img src={imgsUrl[currImgPos]} />
                            <div
                                className="absolute top-2 left-2 cursor-pointer bg-black/30 p-0.5 rounded-sm"
                                onClick={() => {
                                    setImgsChange(true);
                                    setImgsUrl(prev => {
                                        const next = prev.filter((_, i) => i !== currImgPos);
                                        if (currImgPos >= next.length && currImgPos > 0) {
                                            setCurrImgPos(currImgPos - 1);
                                        }
                                        return next;
                                    });
                                }}
                            >
                                <Delete />
                            </div>
                            <div
                                className="absolute top-2 right-2 cursor-pointer bg-black/30 p-0.5 rounded-sm"
                                onClick={() => {
                                    replaceRef.current = currImgPos;
                                    inputRef.current?.click();
                                }}
                            >
                                <EditSVG />
                            </div>
                        </div>
                        {imgsUrl.length > 1 && currImgPos !== imgsUrl.length - 1 && (
                            <div
                                className="absolute rotate-180 right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full z-10"
                                onClick={() => setCurrImgPos(prev => prev + 1)}
                            >
                                <SleekLeftArrow />
                            </div>
                        )}
                        {item?.type === "merch" && (
                            <button
                                type="button"
                                className="border border-dashed border-black py-2 bg-white text-black px-16"
                                onClick={() => {
                                    replaceRef.current = -1;
                                    inputRef.current?.click();
                                }}
                            >
                                {imgs.length === 0 ? "Upload Images" : "Add More Images"}
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        className="flex-1 content-center text-center text-white/30 border border-dashed border-white cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                    >
                        Upload Images
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <div key={item.id} className="flex gap-4 flex-wrap">
                        {Object.entries(item)
                            .filter(([key]) => allowedKeys.includes(key) && !(key === "meta" && (item.type === "track" || item.type === "blog")))
                            .map(([key, value]) => (
                                <div className="flex-1">
                                    <AddInput
                                        key={key}
                                        label={key === "meta" ? (item.type === "merch" ? "Price" : "Meta") : key.charAt(0).toUpperCase() + key.slice(1)}
                                        name={key}
                                        defaultValue={value ?? ""}
                                        placeholder={value ?? ""}
                                        type={typeof value === "number" ? "number" : "text"}
                                    />
                                </div>
                            ))}
                    </div>
                    {item.type === "track" && (
                        <div className="flex-1 content-center">
                            <input
                                type="file"
                                ref={audioRef}
                                accept="audio/*"
                                className="hidden"
                                name="track"
                                onChange={e => {
                                    if (e.target.files?.[0]) setToast("Track has been changed");
                                    setSongsChange(true);
                                }}
                            />
                            <button
                                type="button"
                                className="border border-dashed border-black bg-white text-black py-2 w-full text-center cursor-pointer"
                                onClick={() => audioRef.current?.click()}
                            >
                                {"Change Track"}
                            </button>
                        </div>
                    )}
                    {item.type === "blog" && (
                        <>
                            <div className="flex border border-white divide-x divide-white w-full text-center p-1">
                                <label className={`flex-1 cursor-pointer ${blogUploadtype === "upload" ? "bg-white text-black" : ""}`}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="upload"
                                        checked={blogUploadtype === "upload"}
                                        onChange={() => setBlogUploadType("upload")}
                                        className="hidden"
                                    />
                                    Upload
                                </label>
                                <label className={`flex-1 cursor-pointer ${blogUploadtype === "type" ? "bg-white text-black" : ""}`}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="type"
                                        checked={blogUploadtype === "type"}
                                        onChange={() => setBlogUploadType("type")}
                                        className="hidden"
                                    />
                                    Type
                                </label>
                            </div>
                            {blogUploadtype === "upload" && (
                                <div className="flex flex-col gap-1 ">
                                    <label className="text-white/50 text-sm uppercase tracking-widest">Change/Edit Blog</label>
                                    <input
                                        type="file"
                                        name="file"
                                        accept=".pdf"
                                        className="border-b border-white"
                                        onChange={e => {
                                            if (e.target.files?.[0]) setToast("Blog file has been changed");
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {blogUploadtype === "type" && (
                <>
                    <input type="hidden" name="html" value={editorContent} /> <TipTap value={editorContent} onChange={setEditorContent} />
                </>
            )}
            {toast && <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded ">{toast}</div>}
            <div className="flex sticky mt-auto bottom-0 text-center divide-x divide-white text-md justify-center border-t w-fit self-center">
                <button type="button" className="cursor-pointer px-20 py-1 mb-1">
                    Upload
                </button>
                <button className="cursor-pointer px-20 py-1 mb-1" onClick={onClose}>
                    Close
                </button>
            </div>
        </dialog>
    );
}
