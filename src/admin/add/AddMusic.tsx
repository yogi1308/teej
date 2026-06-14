import { useState } from "react";
import { motion } from "framer-motion";

export default function AddMusic() {
    const [formData, setFormData] = useState({
        title: "",
        artist: "Teej",
        meta: "",
        album: "",
        genre: "",
        description: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-4 font-dots text-white">
            <header className="border-b border-white/10 pb-4">
                <h2 className="text-2xl text-yellow tracking-tighter">NEW_AUDIO_ENTRY</h2>
                <p className="text-[10px] opacity-40 uppercase tracking-[0.3em]">Initialize Music Synchronization</p>
            </header>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Metadata */}
                <div className="flex flex-col gap-4">
                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-yellow transition-colors">Track Title</label>
                        <input 
                            name="title"
                            type="text" 
                            placeholder="IDENTIFY_TRACK"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-yellow transition-all"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-yellow transition-colors">Artist / Collab</label>
                        <input 
                            name="artist"
                            type="text" 
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-yellow transition-all"
                            value={formData.artist}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="group flex flex-col gap-1">
                            <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-yellow transition-colors">Duration</label>
                            <input 
                                name="meta"
                                type="text" 
                                placeholder="00:00"
                                className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-yellow transition-all text-center"
                                value={formData.meta}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="group flex flex-col gap-1">
                            <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-yellow transition-colors">Genre</label>
                            <input 
                                name="genre"
                                type="text" 
                                placeholder="PHONK"
                                className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-yellow transition-all text-center"
                                value={formData.genre}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="group flex flex-col gap-1">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest group-focus-within:text-yellow transition-colors">Album Info</label>
                        <input 
                            name="album"
                            type="text" 
                            placeholder="SINGLE_RELEASE"
                            className="bg-white/5 border-b border-white/20 p-2 outline-none focus:border-yellow transition-all"
                            value={formData.album}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Right Column: Assets */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest">Cover Art (Visual Buffer)</label>
                        <div className="border-2 border-dashed border-white/10 aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-yellow/40 hover:bg-yellow/5 transition-all group">
                            <span className="text-3xl opacity-20 group-hover:opacity-100 group-hover:text-yellow transition-all">+</span>
                            <span className="text-[8px] tracking-[0.4em] opacity-30">LOAD_IMAGE</span>
                            <input type="file" className="hidden" accept="image/*" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] opacity-40 uppercase tracking-widest">Master Audio (Stream Source)</label>
                        <div className="border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:border-yellow/40 transition-all cursor-pointer">
                            <span className="text-[10px] tracking-widest opacity-60">SELECT_MP3_WAV</span>
                            <div className="size-4 rounded-full bg-yellow animate-pulse shadow-[0_0_10px_rgba(252,238,10,0.5)]"></div>
                            <input type="file" className="hidden" accept="audio/*" />
                        </div>
                    </div>
                </div>

                {/* Full Width: Description */}
                <div className="md:col-span-2 group flex flex-col gap-2">
                    <label className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Data Description</label>
                    <textarea 
                        name="description"
                        className="bg-white/5 border border-white/10 h-24 p-3 font-hand text-lg outline-none focus:border-yellow transition-all resize-none"
                        placeholder="Additional track information..."
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 bg-yellow text-black py-4 font-bold uppercase tracking-[0.4em] text-xs shadow-[0_0_20px_rgba(252,238,10,0.2)] hover:shadow-[0_0_30px_rgba(252,238,10,0.4)] transition-all"
            >
                Execute_Push_To_Database
            </motion.button>
        </div>
    );
}
