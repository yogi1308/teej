import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import DOMPurify from "dompurify";
import Thumbnail from "@/components/Thumbnail";
import LoadingContent from "../load/LoadingContent";

export default function BlogPost() {
    const { blogId } = useParams();
    const { data: blog, loading, error } = useFetch(`/api/blog/${blogId}`);
    const [html, setHtml] = useState("");
    const isPdf = blog?.contentType === "pdf";
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (blog?.contentUrl && !isPdf) {
            fetch(blog.contentUrl)
                .then(r => r.text())
                .then(setHtml)
                .catch(() => setHtml("<p>Failed to load content</p>"));
        }
    }, [blog?.contentUrl]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    if (!blog) return null;

    return (
        <>
            {!loading && (
                <div className={`flex items-center justify-center overflow-hidden ${isOpen && "overflow-y-scroll"}`}>
                    {isOpen && <div className="fixed inset-0 z-500000000 bg-black/50 backdrop-blur-md" />}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2">
                        <Thumbnail src={blog?.imageUrl || blog?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
                    </div>
                    <div className={`relative top-[calc(50vh)] bottom-0 pt-4 z-100000000000 flex flex-col h-screen`}>
                        <div
                            className={`bg-[rgba(0,0,0,0.4)] flex justify-between border-t border-b py-2 px-4 items-center hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all w-screen ${!isOpen && "sticky top-[50vh]"}`}
                            onClick={() => {
                                setIsOpen(prev => !prev);
                            }}
                        >
                            <div className="flex flex-col ">
                                <p className=""> {blog?.title} </p>
                                <p className="text-[1.0rem]! text-gray-400"> {blog?.subtitle} </p>
                            </div>
                            <div className="flex gap-52">
                                <div className="flex gap-4 justify-between">
                                    <p>Read</p>
                                    {isOpen ? <p>-</p> : <p>+</p>}
                                </div>
                                <p>{new Date(blog?.meta).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="flex-1 px-4 py-4">
                                {isPdf ? (
                                    <iframe src={`/api/blog/pdf/${blog.id}`} className="border border-gray-900 rounded w-full min-h-[calc(100vh-7rem)]" />
                                ) : (
                                    html && <div className="w-fit" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {loading && <LoadingContent />}
        </>
    );
}
