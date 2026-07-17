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
                <div className={`${isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "overflow-hidden"}`}>
                    {isOpen && <div className="fixed inset-0 z-40 bg-black/80" />}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2">
                        <Thumbnail src={blog?.imageUrl || blog?.coverUrl} style={{ width: "clamp(10rem, 60vh, 90vw)" }} />
                    </div>
                    <div className="fixed top-[calc(50vh)] w-screen z-50 flex flex-col h-0 max-h-[60vh] pointer-events-none">
                        <div
                            className="pointer-events-auto bg-[rgba(0,0,0,0.4)] flex gap-12 justify-between border-t border-b py-2 px-4 items-center hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all w-screen shrink-0"
                            onClick={() => {
                                setIsOpen(prev => !prev);
                            }}
                        >
                            <div className="flex flex-col min-w-0">
                                <p className="truncate"> {blog?.title} </p>
                                <p className="truncate text-gray-400"> {blog?.subtitle} </p>
                            </div>
                            <div className="flex gap-12">
                                <div className="flex gap-4 justify-between">
                                    <p>Read</p>
                                    {isOpen ? <p>-</p> : <p>+</p>}
                                </div>
                                <p className="hidden md:block">{new Date(blog?.meta).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 pointer-events-auto">
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
