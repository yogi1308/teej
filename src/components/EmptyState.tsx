export default function EmptyState({ message = "Nothing here yet", className = "" }: { message?: string; className?: string }) {
    return (
        <>
            <div
                className="border border-white/50 absolute top-18 left-1/2 -translate-x-1/2 shimmer"
                style={{ width: "clamp(10rem, 60vh, 60vw)", height: "clamp(10rem, 60vh, 40vh)" }}
            ></div>
            <div className={`absolute top-1/2 text-center w-screen border-t border-b py-3 border-white bg-black/30 backdrop-blur-2xl`}>
                <p className="uppercase tracking-widest text-white/70">{message}</p>
            </div>
        </>
    );
}
