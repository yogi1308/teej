import TinyMCE from "../../components/onlineLibraries/TinyMCE";
import AddImage from "./AddImage";
import AddInput from "./AddInput";

export default function AddBlog() {
    return (
        <form className="flex flex-col gap-4 p-4">
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
                </div>
            </div>
            <div>
                <TinyMCE />
            </div>
        </form>
    );
}
