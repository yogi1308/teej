import { useState } from "react";

const tiers = [
    {  amount: "$3" },
    {  amount: "$10" },
    {  amount: "$25" },
];

export default function Donate() {
    const [open, setOpen] = useState(false);
    const [sel, setSel] = useState(1);
    const [cus, setCus] = useState("");

    return (
        <div className="bg-black h-screen w-screen overflow-hidden text-white font-dots">
            <div className="fixed top-[50vh] w-screen z-100000 flex flex-col">
                <div
                    className="bg-[rgba(0,0,0,0.4)] flex justify-between border-y border-white py-2 px-4 items-center hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all cursor-pointer"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <p>Support</p>
                    <div className="flex gap-12 items-center">
                        <p>{open ? "Close" : "Donate"}</p>
                        <p>{open ? "−" : "+"}</p>
                    </div>
                </div>
                {open && (
                    <div className="font-king flex flex-col p-4 gap-4">
                        <p className="text-white/50 text-sm">Choose an amount</p>
                        <div className="grid grid-cols-3 gap-3">
                            {tiers.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setSel(i); setCus(""); }}
                                    className={`border py-3 text-center cursor-pointer ${
                                        sel === i && !cus
                                            ? "border-white bg-white/10"
                                            : "border-white/30 hover:border-white/60 hover:bg-white/5"
                                    }`}
                                >
                                    <p>{t.amount}</p>
                                </button>
                            ))}
                        </div>
                        <div>
                            <p className="text-white/50 text-sm mb-2">Custom</p>
                            <input
                                type="text"
                                value={cus}
                                onChange={e => { setCus(e.target.value); setSel(-1); }}
                                placeholder="$0"
                                className="w-full border border-white/30 rounded p-2 bg-transparent text-white outline-none focus:border-white"
                            />
                        </div>
                        <a
                            href="https://paypal.me/teej"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border border-white p-3 text-center tracking-widest hover:bg-white/10 transition-all"
                        >
                            Continue
                        </a>
                        <p className="text-white/30 text-xs text-center">PayPal</p>
                    </div>
                )}
            </div>
        </div>
    );
}
