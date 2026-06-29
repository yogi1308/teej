import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMerch } from "../hooks/useMerch";
import SleekLeftArrow from "../assets/svg/SleekLeftArrow";
import SleekRightArrow from "../assets/svg/SleekRightArrow";

export default function MerchPost() {
    const { merchId } = useParams();
    const { merch } = useMerch(merchId);
    const item = Array.isArray(merch) ? merch[0] : merch;
    const [currImg, setCurrImg] = useState(0);

    if (!item) return null;

    const imgs = item.imageUrl || [];

    return (
        <div className="bg-black min-h-screen text-white p-8 pt-20 font-dots">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="relative flex-1">
                    {imgs.length > 0 ? (
                        <>
                            {imgs.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full z-10"
                                        onClick={() => setCurrImg(prev => (prev === 0 ? imgs.length - 1 : prev - 1))}
                                    >
                                        <SleekLeftArrow />
                                    </button>
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full z-10"
                                        onClick={() => setCurrImg(prev => (prev === imgs.length - 1 ? 0 : prev + 1))}
                                    >
                                        <SleekRightArrow />
                                    </button>
                                </>
                            )}
                            <img src={imgs[currImg]} className="w-full h-auto object-cover rounded" />
                            {imgs.length > 1 && (
                                <div className="flex justify-center gap-2 mt-2">
                                    {imgs.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`w-2 h-2 rounded-full ${i === currImg ? "bg-white" : "bg-white/30"}`}
                                            onClick={() => setCurrImg(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-64 bg-white/10 rounded flex items-center justify-center text-white/30">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-2xl">{item.title}</h1>
                    <p className="text-xl text-red">{item.meta}</p>
                    {item.description && <p className="text-white/60">{item.description}</p>}
                    {item.sizes && (
                        <div className="flex flex-col gap-1">
                            <p className="text-white/50 text-sm uppercase tracking-widest">Sizes</p>
                            <div className="flex gap-2 flex-wrap">
                                {item.sizes.split(",").map(s => (
                                    <span key={s} className="border border-white/30 px-3 py-1 text-sm">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <p className={`text-sm ${item.inStock > 0 ? "text-green-400" : "text-red-400"}`}>
                        {item.inStock > 0 ? `In Stock (${item.inStock})` : "Out of Stock"}
                    </p>
                </div>
            </div>
        </div>
    );
}
