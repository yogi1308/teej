import { useLocation, useNavigate } from "react-router-dom";
import ArrowRight from "@/assets/svg/ArrowRight";

const detailRoutes = ["merch", "blog"];

export default function BackButton() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const segments = pathname.split("/").filter(Boolean);
    const isDetailPage = segments.length >= 2 && detailRoutes.includes(segments[segments.length - 2]) && !detailRoutes.includes(segments[segments.length - 1]);

    if (!isDetailPage) return null;

    return (
        <button
            onClick={() => navigate("/" + segments.slice(0, -1).join("/"))}
            className="rotate-180 fixed bottom-2 left-1/2 -translate-x-1/2 cursor-pointer z-50 bg-black/50 backdrop-blur-md p-1 border border-white"
        >
        <ArrowRight />
        </button>
    );
}
