import { useState } from "react";

export default function Hover1({ children, active }: { children: React.ReactNode; active?: boolean }) {
    const [hovered, setHovered] = useState(false);
    const on = active || hovered;

    return (
        <div
            style={{
                position: "relative",
                cursor: "pointer",
                color: on ? "#fff" : "rgba(255, 255, 255, 0.7)",
                boxShadow: on ? "0 0 20px rgba(35, 201, 236, 0.3)" : "none",
                transition: "all 0.3s ease",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    width: "3px",
                    height: "80%",
                    transform: `translateY(-50%) scale(${on ? 1 : 0})`,
                    borderRadius: "10px",
                    background: "#23c9ec",
                    boxShadow: "-6px 0 6px rgba(35, 201, 236, 0.9)",
                    transition: "transform 0.3s ease",
                }}
            />
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: "3px",
                    height: "80%",
                    transform: `translateY(-50%) scale(${on ? 1 : 0})`,
                    borderRadius: "10px",
                    background: "#23c9ec",
                    boxShadow: "3px 0 6px rgba(35, 201, 236, 0.9)",
                    transition: "transform 0.3s ease",
                }}
            />
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    height: "100%",
                    width: on ? "100%" : 0,
                    background:
                        on ? "radial-gradient(ellipse, rgba(35, 201, 236, 0.15), transparent 0%, rgba(35, 201, 236, 0.15))" : "none",
                    transition: "width 0.3s ease",
                }}
            />
            <div
                style={{
                    transition: "all 0.2s ease",
                    textShadow: on
                        ? "0 0 10px rgba(35, 201, 236, 0.55)"
                        : "none",
                }}
            >
                {children}
            </div>
        </div>
    );
}
