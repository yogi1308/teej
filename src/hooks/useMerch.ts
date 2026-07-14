import useFetch from "./useFetch";

export function useMerch(merchId?: string) {
    const url = merchId ? `/api/merch/${merchId}` : "/api/merch/";
    return useFetch(url);
}
