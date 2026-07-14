export default async function fetchJSON(url : string) {
    try {
        const res = await fetch(url)
        const body = await res.json();
        if (!body.success) throw new Error(body.error ?? "Request failed");
        return body.data
    } catch (error) {
        throw new Error( error );
    }

}
