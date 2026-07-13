import Navbar from "./Navbar.tsx";
import Navigator from "./Navigator.tsx";
import { useState, useEffect, useRef } from "react";

export default function Nav() {
    const [navigatorVisibility, setNavigatorVisibility] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const opened = useRef(false);

    function toggleNavigatorVisibility() {
        setNavigatorVisibility(v => !v);
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (navigatorVisibility) {
            opened.current = true;
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.showModal();
                requestAnimationFrame(() => {
                    dialog.style.transform = "scaleY(1)";
                });
            }, 10);
        } else if (opened.current) {
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.close();
            }, 300);
        }
    }, [navigatorVisibility]);

    return (
        <>
            {!navigatorVisibility && (
                <div
                    style={{ transition: "opacity 0.3s ease-in-out 0.4s", opacity: 1 }}
                    onClick={() => {
                        toggleNavigatorVisibility();
                    }}
                >
                    <Navbar />
                </div>
            )}

            <Navigator toggleNavigatorVisibility={toggleNavigatorVisibility} dialogRef={dialogRef} />
        </>
    );
}
