import { useState, useEffect } from "react";

export function useBlog(blogId?: string) {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const url = blogId ? `/api/blog/${blogId}` : "/api/blog/";
                const res = await fetch(url);
                const body = await res.json();
                setBlog(body.data);
            } catch {
                setBlog([]);
            }
        })();
    }, [blogId]);

    async function refetch() {
        try {
            const url = blogId ? `/api/blog/${blogId}` : "/api/blog/";
            const res = await fetch(url);
            const body = await res.json();
            setBlog(body.data);
        } catch {
            setBlog([]);
        }
    }

    return { blog, refetch };
}
