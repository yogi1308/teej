import MainContent from "../components/lists/MainContent.tsx";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import TiltedCard from "../components/onlineLibraries/TiltedCard.tsx";
import { useState } from "react";
import Add from "./add/Add.tsx";
import { useBlog } from "../hooks/useBlog.tsx";

export default function Blog() {
    const { blog, refetch } = useBlog();
    const [currItem, setCurrItem] = useState(blog.length > 0 ? blog[0] : null);
    return (
        <div className="bg-black h-screen w-screen overflow-hidden">
            <MainContent content={blog} 
                currItem={currItem}
                setCurrItem={setCurrItem}
            />
            <div className="absolute! top-[3rem] left-1/2 -translate-x-1/2">
                <TiltedCard
                    imageSrc={currItem?.imageUrl}
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
            </div>
            <Add tab={"Blog"} refetch={async () => { const d = await refetch(); setCurrItem(d[0]); }}/>
        </div>
    );
}

