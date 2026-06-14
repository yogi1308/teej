import { useState } from "react";
import { motion } from "framer-motion";

export default function AddBlog() {
    const [formData, setFormData] = useState({
        title: "",
        meta: "", // Publish Date
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 font-dots text-white">
            <header className="border-b border-white/10 pb-4">
                <h2 className="text-2xl text-white tracking-tighter">NEW_BLOG_ENTRY</h2>
                <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Initialize Narrative Broadcast</p>
            </header>

            <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-white">Post Title</label>
                        <input 
                            name="title"
                            type="text" 
                            placeholder="IDENTIFY_POST"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-white transition-all"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-white">Publish Date</label>
                        <input 
                            name="meta"
                            type="text" 
                            placeholder="YYYY-MM-DD"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-white transition-all"
                            value={formData.meta}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-white">Hero Header (Visual Buffer)</label>
                    <div className="border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:border-white/40 transition-all cursor-pointer">
                        <span className="text-[10px] tracking-widest opacity-60">SELECT_HEADER_IMAGE</span>
                        <div className="size-4 rounded-sm bg-white/20 hover:bg-white transition-colors"></div>
                        <input type="file" className="hidden" accept="image/*" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Markdown / HTML Content (TinyMCE Container)</label>
                    <div className="bg-white/5 border border-white/10 min-h-[300px] p-4 font-hand text-xl opacity-30 flex items-center justify-center border-dashed">
                        TINYMCE_EDITOR_WILL_MOUNT_HERE
                    </div>
                </div>
            </form>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 bg-white text-black py-4 font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
            >
                Execute_Broadcast
            </motion.button>
        </div>
    );
}
