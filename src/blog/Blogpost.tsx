import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import DOMPurify from "dompurify";

export default function BlogPost() {
    const { blogId } = useParams();
    const { blog } = useBlog(blogId);
    const [html, setHtml] = useState("");
    const isPdf = blog?.contentType === "pdf";

    useEffect(() => {
        if (blog?.contentUrl && !isPdf) {
            fetch(blog.contentUrl)
                .then(r => r.text())
                .then(setHtml)
                .catch(() => setHtml("<p>Failed to load content</p>"));
        }
    }, [blog?.contentUrl]);

    if (!blog) return null;

    return (
        <div className="bg-black min-h-screen text-white p-8 pt-20 font-dots flex flex-col gap-1">
            <h1 className="">{blog.title}</h1>
            {blog.subtitle && <h2 className="text-white/60">{blog.subtitle}</h2>}
            <p className="">{new Date(blog.createdAt).toLocaleDateString()}</p>
            {isPdf ? (
                <iframe
                    src={`/api/blog/pdf/${blog.id}`}
                    className="w-full h-[90vh] border border-gray-700 rounded mt-4"
                />
            ) : html && (
                <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
                />
            )}
        </div>
    );
}
