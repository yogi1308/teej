import Navbar from "./Navbar.tsx";
import Navigator from "./Navigator.tsx";
import { useState, useEffect, useRef } from "react";
import BackButton from "../BackButton";

export default function Nav() {
    const [navigatorVisibility, setNavigatorVisibility] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const opened = useRef(false);
    const isOpenRef = useRef(navigatorVisibility);
    isOpenRef.current = navigatorVisibility;
    const pushedRef = useRef(false);

    function toggleNavigatorVisibility() {
        setNavigatorVisibility(v => !v);
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const onCancel = (e: Event) => {
            e.preventDefault();
            setNavigatorVisibility(false);
        };
        dialog.addEventListener("cancel", onCancel);

        if (navigatorVisibility) {
            opened.current = true;
            if (!pushedRef.current) {
                window.history.pushState({ closeDialog: "nav" }, "");
                pushedRef.current = true;
            }
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.showModal();
                requestAnimationFrame(() => {
                    dialog.style.transform = "scaleY(1)";
                });
            }, 10);
        } else if (opened.current) {
            pushedRef.current = false;
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.close();
            }, 300);
        }

        return () => dialog.removeEventListener("cancel", onCancel);
    }, [navigatorVisibility]);

    useEffect(() => {
        const onPop = () => {
            if (!isOpenRef.current) return;
            pushedRef.current = false;
            setNavigatorVisibility(false);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

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
            <BackButton />
        </>
    );
}
