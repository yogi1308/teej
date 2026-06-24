import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBlog } from "../hooks/useBlog";

export default function BlogPost() {
    const { blogId } = useParams();
    const { blog } = useBlog(blogId);
    const [html, setHtml] = useState("");

    if (!blog) return null;

    return (
        <div className="bg-black min-h-screen text-white p-8 pt-12">
            <h1 className="font-dots">{blog.title}</h1>
            {blog.subtitle && <p className="text-white/60 text-sm ">{blog.subtitle}</p>}
            <p className="text-xs">{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
    );
}
