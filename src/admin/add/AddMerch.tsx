import { useState } from "react";
import { motion } from "framer-motion";

export default function AddMerch() {
    const [formData, setFormData] = useState({
        title: "",
        meta: "", // Price
        description: "",
        sizes: [] as string[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 font-dots text-white">
            <header className="border-b border-white/10 pb-4">
                <h2 className="text-2xl text-blue-400 tracking-tighter">NEW_MERCH_ENTRY</h2>
                <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Initialize Inventory Synchronization</p>
            </header>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-blue-400">Product Title</label>
                        <input 
                            name="title"
                            type="text" 
                            placeholder="IDENTIFY_ITEM"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-blue-400 transition-all"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-blue-400">Unit Price</label>
                        <input 
                            name="meta"
                            type="text" 
                            placeholder="$00.00"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-blue-400 transition-all"
                            value={formData.meta}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group flex flex-col gap-2">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest">Available Sizes</label>
                        <div className="flex gap-2">
                            {["S", "M", "L", "XL"].map(size => (
                                <button key={size} type="button" className="border border-white/20 size-8 text-[10px] hover:bg-blue-400 hover:text-black transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-widest">Product Shot (Buffer)</label>
                    <div className="border-2 border-dashed border-white/10 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-blue-400/40 hover:bg-blue-400/5 transition-all group">
                        <span className="text-3xl opacity-20 group-hover:opacity-100 group-hover:text-blue-400">+</span>
                        <span className="text-[8px] tracking-[0.4em] opacity-30">LOAD_SHOT</span>
                        <input type="file" className="hidden" accept="image/*" />
                    </div>
                </div>

                <div className="md:col-span-2 group flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Item Narrative</label>
                    <textarea 
                        name="description"
                        className="bg-white/5 border border-white/10 h-24 p-3 font-hand text-lg outline-none focus:border-blue-400 transition-all resize-none"
                        placeholder="Material, fit, and origin details..."
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 bg-blue-400 text-black py-4 font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_20px_rgba(96,165,250,0.2)] hover:shadow-[0_0_30px_rgba(96,165,250,0.4)] transition-all"
            >
                Execute_Push_To_Database
            </motion.button>
        </div>
    );
}
