import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Hover1 from "@/components/Hover1";
import GradientBorders from "@/components/GradientBorders";

export default function Home() {
    const { pathname } = useLocation();
    const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

    useEffect(() => {
        fetch("/api/")
            .then(r => r.json())
            .then(data => {
                if (data?.socialLinks) setSocialLinks(data.socialLinks);
            });
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] flex">
            <GradientBorders />
            <main className="flex flex-col bg-white/05 items-center w-full justify-center gap-4 ">
                <h1>TEEJ</h1>
                <div className="flex flex-wrap items-center justify-center content-center">
                    <Link to="/music" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/music")}><div className="p-1 px-4 sm:px-16">Music</div></Hover1>
                    </Link>
                    <Link to="/merch" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/merch")}><div className="p-1 px-4 sm:px-16">Merch</div></Hover1>
                    </Link>
                    <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/blog")}><div className="p-1 px-4 sm:px-16">Blog</div></Hover1>
                    </Link>
                    <Link to="/donate" style={{ textDecoration: "none", color: "inherit" }}>
                        <Hover1 active={pathname.includes("/donate")}><div className="p-1 px-4 sm:px-16">Donate</div></Hover1>
                    </Link>
                </div>
                {socialLinks.length > 0 && (
                    <div className="flex gap-4 mt-6">
                        {socialLinks.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
                                {link.platform}
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
