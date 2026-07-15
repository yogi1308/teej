export default function LoadingContent() {
    return (
        <div>
            <div
                className="border border-white/50 absolute top-16 left-1/2 -translate-x-1/2 shimmer"
                style={{ width: "clamp(10rem, 60vh, 60vw)", height: "clamp(10rem, 60vh, 40vh)" }}
            ></div>
            <div className="flex flex-col absolute bottom-0 top-1/2 w-screen">
                <div className="flex items-center justify-between border-y border-white w-full min-h-12 px-4">
                    <div className="h-4 w-40 bg-white/30 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-white/30 rounded animate-pulse" />
                </div>
                <div className="flex-1 flex flex-col p-2 gap-2">
                    {Array.from({ length: 15 }, (_, i) => (
                        <div key={i} className="flex justify-between items-center px-4 py-3">
                            <div className="h-3 w-48 bg-white/20 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-white/20 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
