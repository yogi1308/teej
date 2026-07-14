import useFetch from "./useFetch";

export function useBlog(blogId?: string) {
    const url = blogId ? `/api/blog/${blogId}` : "/api/blog/";
    return useFetch(url);
}
