import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Hover1 from "@/components/Hover1.tsx";
import GradientBorders from "@/components/GradientBorders.tsx";
import Delete from "@/assets/svg/Delete";
import { Overlay } from "@/pages/overlay/UploadingOverlay";

export default function AdminHome() {
    const { pathname } = useLocation();
    const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState("");

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    useEffect(() => {
        fetch("/api/")
            .then(r => r.json())
            .then(data => {
                if (data?.socialLinks) setSocialLinks(data.socialLinks);
            });
    }, []);

    useEffect(() => {
        const listener = () => {
            fetch("/api/")
                .then(r => r.json())
                .then(data => {
                    if (data?.socialLinks) setSocialLinks(data.socialLinks);
                });
        };
        window.addEventListener("refetch-admin", listener);
        return () => window.removeEventListener("refetch-admin", listener);
    }, []);

    const handleDelete = async (i: number) => {
        setDeleting(true);
        try {
            const res = await fetch("/api/delete-social-link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index: i }),
                credentials: "include",
            });
            if (!res.ok) {
                showToast("Failed to delete link");
                return;
            }
            window.dispatchEvent(new CustomEvent("refetch-admin"));
        } catch {
            showToast("Failed to delete link");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            {deleting && <Overlay overlaytext="Deleting.." />}
            {toast && (
                <div className="fixed bottom-0 right-1/2 translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
                    {toast}
                </div>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] flex">
                <GradientBorders />
                <main className="flex flex-col bg-white/05 items-center w-full justify-center gap-4 ">
                    <h1>TEEJ</h1>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link to="/admin/music" style={{ textDecoration: "none", color: "inherit" }}>
                            <Hover1 active={pathname.includes("/music")}><div className="p-1 px-16">Music</div></Hover1>
                        </Link>
                        <Link to="/admin/merch" style={{ textDecoration: "none", color: "inherit" }}>
                            <Hover1 active={pathname.includes("/merch")}><div className="p-1 px-16">Merch</div></Hover1>
                        </Link>
                        <Link to="/admin/blog" style={{ textDecoration: "none", color: "inherit" }}>
                            <Hover1 active={pathname.includes("/blog")}><div className="p-1 px-16">Blog</div></Hover1>
                        </Link>
                        <Link to="/admin/donate" style={{ textDecoration: "none", color: "inherit" }}>
                            <Hover1 active={pathname.includes("/donate")}><div className="p-1 px-16">Donate</div></Hover1>
                        </Link>
                    </div>
                    {socialLinks.length > 0 && (
                        <div className="flex gap-4 mt-6 flex-wrap justify-center">
                            {socialLinks.map((link, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
                                        {link.platform}
                                    </a>
                                    <button onClick={() => handleDelete(i)}>
                                        <Delete />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
