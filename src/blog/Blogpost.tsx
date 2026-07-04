import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import DOMPurify from "dompurify";
import TiltedCard from "../components/onlineLibraries/TiltedCard";
import BackArrow from "../assets/svg/BackArrow";

export default function BlogPost() {
    const { blogId } = useParams();
    const { blog } = useBlog(blogId);
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
        <div className="bg-black min-h-screen text-white font-dots flex items-center justify-center">
            <TiltedCard
                imageSrc={blog?.imageUrl}
                containerHeight="min-content"
                containerWidth="min-content"
                imageHeight="clamp(10rem, 60vh, 90vw)"
                imageWidth="clamp(10rem, 60vh, 90vw)"
                rotateAmplitude={12}
                scaleOnHover={1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent
            />
            <div
                className={`flex justify-between fixed hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all top-[calc(50vh-1.2rem)] z-1 w-[calc(100vw-2rem)] border-t border-b py-2 px-4 bg-[rgba(0,0,0,0.4)] items-center`}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <div className="flex flex-col gap-2">
                    <p className=""> {blog?.title} </p>
                    <p className="text-[1.0rem]! text-gray-400"> {blog?.subtitle} </p>
                </div>
                <div className="flex gap-4 justify-between">
                    <p>Read</p>
                    {isOpen ? <p>-</p> : <p>+</p>}
                </div>
            </div>
            {isOpen && (
                <>
                    <div
                        className="fixed min-h-[calc(100vh - 1rem)] inset-0 z-100000000000 bg-black/50 backdrop-blur-sm p-4 pt-16 font-king gap-8 overflow-y-auto"
                        onClick={e => {
                            if (e.target === e.currentTarget) setIsOpen(false);
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h1 className=""> {blog?.title} </h1>
                                <h3 className="text-gray-400"> {blog?.subtitle} </h3>
                            </div>
                            <div className="flex flex-col">
                                <p>Description</p>
                                <p>{blog?.description}</p>
                            </div>
                        </div>
                        {isPdf ? (
                            <iframe src={`/api/blog/pdf/${blog.id}`} className="border border-gray-900 rounded my-4 w-full h-full" />
                        ) : (
                            html && <div className="pt-6 w-fit" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
                        )}
                    </div>
                    <div
                        className="fixed bottom-4 cursor-pointer left-1/2 -translate-x-1/2 w-min border border-gray-700 p-1 mix-blend-difference z-[100000000001]"
                        onClick={() => setIsOpen(false)}
                    >
                        <BackArrow />
                    </div>
                </>
            )}
        </div>
    );
}
