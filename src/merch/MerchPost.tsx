import { useParams } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Gemini_Generated_Image_f97ocif97ocif97o.png";
import SleekLeftArrow from "../assets/svg/SleekLeftArrow";
import TiltedCard from "../components/onlineLibraries/TiltedCard";
import SleekRightArrow from "../assets/svg/SleekRightArrow";
import { useMerch } from "../hooks/useMerch";

export default function MerchPost() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const [currImgPos, setCurrImgPos] = useState(0);
    return (
        <div className="bg-black min-h-screen text-white p-8 pt-20 font-dots flex flex-col gap-1 pl-0">
            <div className="absolute! top-12 left-1/2 -translate-x-1/2">
                {merch?.imageUrl?.length > 1 && (
                    <div
                        className="absolute z-100000000 left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                        onClick={() => {
                            if (currImgPos !== 0) {
                                setCurrImgPos(prev => prev - 1);
                            }
                        }}
                    >
                        <SleekLeftArrow />
                    </div>
                )}
                <TiltedCard
                    imageSrc={merch?.imageUrl?.[currImgPos] || logo}
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
                {merch?.imageUrl?.length > 1 && (
                    <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                        onClick={() => {
                            if (currImgPos !== merch?.imageUrl?.length - 1) {
                                setCurrImgPos(prev => prev + 1);
                            }
                        }}
                    >
                        <SleekRightArrow />
                    </div>
                )}
                {merch?.imageUrl?.length > 1 && (
                    <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 cursor-pointer flex flex-col z-1000000 gap-3">
                        {merch?.imageUrl?.map((url, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrImgPos(idx)}
                                className={`rounded-full w-2 h-2 ${idx === currImgPos ? "bg-white/90" : "bg-white/30"} hover:bg-white`}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
            <div className="absolute top-1/2">
                <h1 className="flex justify-between w-screen p-4 py-2 border-b border-t border-white bg-[rgba(0,0,0,0.4)] items-center">
                    {merch?.title}
                    <p>{merch?.meta && `$ ${merch?.meta}`}</p>
                </h1>
                <h2 className="p-4 pb-0">Details</h2>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-4 pt-0" >
                    <p className="text-white/50">Description</p>
                    <p>{merch?.description}</p>
                    <p className="text-white/50">Sizes</p>
                    <p>{merch?.sizes}</p>
                    <p className="text-white/50">Stock</p>
                    <p className={merch?.inStock > 0 ? "text-green-400" : "text-red-400"}>{merch?.inStock}</p>
                </div>
            </div>
        </div>
    );
}

// model Merch {
//     id           String   @id @default(uuid())
//     title        String
//     meta         String // For price (e.g., "$49.99")
//     imageUrl     String[]
//     imageAssetId String[]
//     description  String?
//     sizes        String // e.g., ["S", "M", "L", "XL"]
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     inStock      Int
//     env          String
// }
