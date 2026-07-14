import { useParams } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function MerchPost() {
    const { merchId } = useParams();
    const { data: merch } = useFetch(`/api/merch/${merchId}`);
    const [isOpen, setIsOpen] = useState(false);
    const [interested, setInterested] = useState(false);
    const [state, handleSubmit] = useForm("xgojqyel");
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {onScroll()},)

    function onScroll() {
        const cx = window.innerWidth / 2;
        cardRefs.current.forEach(c => {
            if (!c) return;
            const r = c.getBoundingClientRect();
            const dist = r.left + r.width / 2 - cx;
            const t = Math.min(Math.abs(dist) / (window.innerWidth * 0.6), 1);
            const s = Math.max(1.1 - t * 1.9, 0.0)
            c.style.transform = `perspective(1000px) scale(${s}) rotateY(${(dist > 0 ? 1 : -1) * t * 45}deg)`
        });
    }

    return (
        <div className={ `overflow-hidden ${isOpen && "overflow-y-scroll"}` }>
            {isOpen && <div className="fixed inset-0 z-50000 bg-black/50 backdrop-blur-md" />}
            <div
                ref={scrollRef}
                className="absolute! top-16 left-1/2 -translate-x-1/2 flex gap-4 no-scrollbar px-148 w-[calc(100vw)] h-[calc(100vh-6rem)] overflow-hidden overflow-x-scroll snap-x snap-mandatory"
                onScroll={onScroll}
                onWheel={e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY }}
            >
                {merch?.imageUrl?.map((url, idx) => (
                    <div key={idx} ref={el => (cardRefs.current[idx] = el)} className="snap-center">
                        <TiltedCard
                            imageSrc={url || logo}
                            containerHeight="clamp(10rem, 60vh, 90vh)"
                            containerWidth="clamp(10rem, 60vh, 90vw)"
                            imageHeight="100%"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent
                        />
                    </div>
                ))}
            </div>
            <div className="fixed top-[calc(50vh)] w-screen z-100000 flex flex-col h-[50%]">
                <div
                    className="sticky top-0 z-10 bg-[rgba(0,0,0,0.4)] flex justify-between border-t border-b border-white py-2 px-4 items-center hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.01] transition-all cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <p>{merch?.title}</p>
                    <div className="flex gap-56 items-center">
                        <div className="flex gap-4 items-center">
                            <p>Details</p>
                            {isOpen ? <p>-</p> : <p>+</p>}
                        </div>
                        <p>{merch?.meta && `$ ${merch?.meta}`}</p>
                    </div>
                </div>
                {isOpen && (
                    <div className="flex-1 p-4 font-king flex flex-col gap-4">
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                            <p className="text-white/50">Description</p>
                            <p>{merch?.description}</p>
                            <p className="text-white/50">Sizes</p>
                            <p>{merch?.sizes}</p>
                            <p className="text-white/50">Stock</p>
                            <p>{merch?.inStock}</p>
                        </div>
                        {state.succeeded ? (
                            <p className="text-green-400">Thanks! We'll get back to you soon.</p>
                        ) : interested ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                                <input type="hidden" name="item" value={merch?.title || ""} />
                                <input type="hidden" name="price" value={merch?.meta || ""} />
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact" className="text-white/70 " title="So that I can coordinate the delivery with you">
                                        How to reach you<span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="contact"
                                        type="text"
                                        name="contact"
                                        placeholder="Email, Instagram, phone..."
                                        className=" border border-white/30 rounded p-2 focus:border-white outline-none"
                                        required
                                    />
                                    <ValidationError prefix="Contact" field="contact" errors={state.errors} />
                                </div>
                                <textarea
                                    id="message"
                                    name="message"
                                    defaultValue={"I'm interested in this item sizes S, M, and XL sizes"}
                                    className="flex-1 border border-white/30 rounded p-2 text-white/50 focus:text-white focus:border-white outline-none"
                                    required
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                                <div className="flex gap-4 w-full">
                                    <button
                                        type="submit"
                                        disabled={state.submitting}
                                        className="flex-1 border border-white p-2 rounded hover:bg-white/10 transition-all disabled:opacity-50"
                                    >
                                        {state.submitting ? "Sending..." : "Send Interest"}
                                    </button>
                                    <button
                                        className="flex-1 border border-white p-2 rounded hover:bg-white/10 transition-all disabled:opacity-50"
                                        onClick={() => {
                                            setInterested(prev => !prev);
                                        }}
                                    >
                                        Close Form
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                className="border border-white p-4 text-center cursor-pointer hover:bg-white/10 transition-all"
                                onClick={() => setInterested(true)}
                            >
                                Interested? Place a request
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
