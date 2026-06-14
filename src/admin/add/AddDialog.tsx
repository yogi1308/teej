import { useState } from "react";
import AddMusic from "./AddMusic";
import AddMerch from "./AddMerch";
import AddBlog from "./AddBlog";
import AddHome from "./AddHome";

export default function AddDialog({
    dialogRef,
    tab,
}: {
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    tab: "Merch" | "Music" | "Blog" | "Home";
}) {
    const [currTab, setCurrTab] = useState(tab);
    return (
        <dialog
            className="dialog flex flex-col h-[90vh] w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-black text-white"
            ref={dialogRef}
        >
            <div className="tabs flex justify-around text-center border-b border-white mx-4 divide-x divide-white p-2 font-dots text-md ">
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Home" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Home")}
                >
                    Home
                </p>
                <p
                    className={`w-100 cursor-pointer transition-all duration-300 hover:text-white/60 ${currTab === "Music" ? "text-white!" : "text-white/30"}`}
                    onClick={() => setCurrTab("Music")}
                >
                    Music
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
            {currTab == "Music" && <AddMusic />}
            {currTab == "Merch" && <AddMerch />}
            {currTab == "Blog" && <AddBlog />}
            {currTab == "Home" && <AddHome />}
            <div className="flex mt-auto text-center divide-x divide-white font-dots text-md justify-center border-t w-fit self-center">
                <button className="cursor-pointer px-20 py-1 mb-1">Upload</button>
                <button className="cursor-pointer px-20 py-1 mb-1">Add More</button>
                <button
                    className="cursor-pointer px-20 py-1 mb-1"
                    onClick={() => {
                        dialogRef.current?.close();
                    }}
                >
                    Close
                </button>
            </div>
        </dialog>
    );
}
