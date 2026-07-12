import { useState } from "react";

export default function Hover1({ children, active }: { children: React.ReactNode; active?: boolean }) {
    const [hovered, setHovered] = useState(false);
    const on = active || hovered;

    return (
        <div
            style={{
                position: "relative",
                cursor: "pointer",
                padding: "0.25rem 4rem",
                color: on ? "#fff" : "rgba(255, 255, 255, 0.7)",
                transition: "all 0.3s ease",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
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
                        "linear-gradient(90deg, rgba(35, 201, 236, 0.2), transparent)",
                    transition: "width 0.3s ease",
                }}
            />
            <p
                style={{
                    transition: "all 0.2s ease",
                    transform: on ? "translateX(20px)" : "none",
                    textShadow: on
                        ? "0 0 10px rgba(35, 201, 236, 0.55)"
                        : "none",
                }}
            >
                {children}
            </p>
        </div>
    );
}
