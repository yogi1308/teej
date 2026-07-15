import { useState } from "react";
import { motion } from "framer-motion";

export default function AddHome() {
    const [formData, setFormData] = useState({
        heroText: "",
    });

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 ">
            <header className="border-b border-white/10 pb-4">
                <h2 className="text-2xl text-red-500 tracking-tighter">HOME_SYSTEM_CONFIG</h2>
                <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Modify Core Interface parameters</p>
            </header>

            <form className="flex flex-col gap-8">
                <div className="group flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-red-500">Global Hero Text</label>
                    <textarea 
                        className="bg-white/5 border border-white/10 h-32 p-4 font-caveat text-4xl outline-none focus:border-red-500 transition-all resize-none"
                        placeholder="Define the primary system greeting..."
                        value={formData.heroText}
                        onChange={(e) => setFormData({ heroText: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest">System Favicon (Buffer)</label>
                        <div className="border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center hover:border-red-500/40 transition-all cursor-pointer group">
                            <div className="size-12 border-2 border-white/10 rounded-full flex items-center justify-center group-hover:border-red-500 transition-colors">
                                <span className="text-xl opacity-20 group-hover:opacity-100">+</span>
                            </div>
                            <span className="text-[8px] mt-2 tracking-widest opacity-30">LOAD_ICO</span>
                            <input type="file" className="hidden" accept=".ico,.png" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-sm">
                            <p className="text-[10px] text-red-500 mb-1 tracking-widest">SYSTEM_WARNING</p>
                            <p className="text-[9px] opacity-60 leading-relaxed uppercase">Changing these parameters will affect the global root interface immediately upon execution.</p>
                        </div>
                    </div>
                </div>
            </form>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 bg-red-500 py-4 font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all"
            >
                Execute_System_Update
            </motion.button>
        </div>
    );
}
