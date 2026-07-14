import { useRef, useState } from "react";
import AddInput from "./AddInput";
import Delete from "@/assets/svg/Delete";
import SleekLeftArrow from "@/assets/svg/SleekLeftArrow";

export default function AddMerch({merchFormRef}) {
    const [imgs, setImgs] = useState([]);
    const [currImgPos, setCurrImgPos] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="flex p-4 gap-4" ref={merchFormRef}>
            <div className="flex flex-col gap-4">
                {imgs.length > 0 ? (
                    <div className="relative">
                        <div
                            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                            onClick={() => {
                                if (currImgPos !== 0) {
                                    setCurrImgPos(prev => prev - 1);
                                }
                            }}
                        >
                            <SleekLeftArrow />
                        </div>
                        <img src={imgs[currImgPos]} className="cursor-pointer border border-dashed border-white object-cover outline-none " />
                        <div
                            className="absolute rotate-180 right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-1 rounded-full"
                            onClick={() => {
                                if (currImgPos !== imgs.length - 1) {
                                    setCurrImgPos(prev => prev + 1);
                                }
                            }}
                        >
                            <SleekLeftArrow />
                        </div>
                        <div
                            className="absolute right-2 top-2 cursor-pointer bg-black/30 rounded-md p-1"
                            onClick={() => {
                                setImgs(prev => prev.filter((_, i) => i !== currImgPos));
                                if (currImgPos === imgs.length - 1 && currImgPos !== 0) {
                                    setCurrImgPos(prev => prev - 1);
                                }
                            }}
                        >
                            <Delete />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 content-center text-center text-white/30 border border-dashed border-white cursor-pointer">
                        Upload Images
                    </div>
                )}
                <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    name="images"
                    required
                    multiple
                    onChange={e => {
                        const files = Array.from(e.target.files || []);
                        const urls = files.map(f => URL.createObjectURL(f));
                        setImgs(prev => [...prev, ...urls]);
                    }}
                />
                <button
                    type="button"
                    className="border border-dashed border-black py-2 bg-white text-black px-16"
                    onClick={() => inputRef.current?.click()}
                >
                    {imgs.length === 0 ? "Upload Images" : "Add More Images"}
                </button>
            </div>
            <div className="flex flex-col flex-1 gap-4 min-w-[50%] ">
                <AddInput label={"Title"} placeholder={"Enter Title"} type={"text"} name={"title"} />
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-white/50 text-sm uppercase tracking-widest">Description</label>
                    <textarea
                        name="description"
                        placeholder={"Add a description..."}
                        rows={5}
                        className="border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20 h-full"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <AddInput label={"Price"} placeholder={"Enter the price"} type={"number"} name={"price"} />
                    </div>
                    <div className="w-full">
                        <AddInput label={"Available Sizes"} placeholder={"Sizes"} type={"text"} name={"sizes"} />
                    </div>
                    <div className="w-full">
                        <AddInput label={"Stock"} placeholder={"Available in Stock"} type={"number"} name={"stock"} />
                    </div>
                </div>
            </div>
        </form>
    );
}
