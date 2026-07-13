export default function GradientBorders() {
    return (
        <>
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{ height: "1px", background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)" }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, #ffffff 100%)" }}
            />
            <div
                className="absolute top-0 left-0 bottom-0 pointer-events-none"
                style={{ width: "1px", background: "linear-gradient(180deg, #ffffff 0%, transparent 100%)" }}
            />
            <div
                className="absolute top-0 right-0 bottom-0 pointer-events-none"
                style={{ width: "1px", background: "linear-gradient(180deg, transparent 0%, #ffffff 100%)" }}
            />
        </>
    );
}
