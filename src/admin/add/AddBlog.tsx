import { useState } from "react";
import AddImage from "./AddImage";
import AddInput from "./AddInput";

export default function AddBlog({ blogFormRef }) {
    const [blogUploadtype, setBlogUploadType] = useState<"upload" | "type">(
        "upload",
    );

    return (
        <form className="flex flex-col gap-4 p-4" ref={blogFormRef}>
            <div className="flex w-full gap-4">
                <div className="w-[50%]">
                    <AddImage defaultText={"Upload Thumbnail"} />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <AddInput
                        label={"Blog TItle"}
                        placeholder={"Enter Your Blog Title"}
                        type={"text"}
                        name={"title"}
                    />
                    <AddInput
                        label={"Blog Subtitle"}
                        placeholder={"Enter Your Blog Subtitle"}
                        type={"text"}
                        name={"subtitle"}
                    />
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-white/50 text-sm uppercase tracking-widest">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder={"Add a description..."}
                            rows={5}
                            className="border border-white bg-transparent px-1 py-2 outline-none text-white placeholder:text-white/20 h-full"
                        />
                    </div>
                    <div className="flex border border-white divide-x divide-white w-full text-center p-1">
                        <label
                            className={`flex-1 cursor-pointer ${blogUploadtype === "upload" ? "bg-white text-black" : ""}`}
                        >
                            <input
                                type="radio"
                                name="type"
                                value="upload"
                                checked={blogUploadtype === "upload"}
                                onChange={() => setBlogUploadType("upload")}
                                className="hidden"
                            />
                            Upload
                        </label>
                        <label
                            className={`flex-1 cursor-pointer ${blogUploadtype === "type" ? "bg-white text-black" : ""}`}
                        >
                            <input
                                type="radio"
                                name="type"
                                value="type"
                                checked={blogUploadtype === "type"}
                                onChange={() => setBlogUploadType("type")}
                                className="hidden"
                            />
                            Type
                        </label>
                    </div>
                    {blogUploadtype === "upload" && (
                        <div className="flex flex-col gap-1 ">
                            <label className="text-white/50 text-sm uppercase tracking-widest">
                                Upload Blog
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept=".pdf"
                                className="border-b border-white"
                            />
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
