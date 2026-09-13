import { useEffect, useRef, useState } from "react";
import AddDialog from "./AddDialog";
import AddIcon from "./AddIcon";

export default function Add({}) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const opened = useRef(false);
    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;
    const pushedRef = useRef(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const onCancel = (e: Event) => {
            e.preventDefault();
            setIsOpen(false);
        };
        dialog.addEventListener("cancel", onCancel);

        if (isOpen) {
            opened.current = true;
            if (!pushedRef.current) {
                window.history.pushState({ closeDialog: "add" }, "");
                pushedRef.current = true;
            }
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.showModal();
                requestAnimationFrame(() => {
                    dialog.style.transform = "scaleY(1)";
                });
            }, 10);
            dialog.style.display = "flex"
        } else if (opened.current) {
            pushedRef.current = false;
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.close();
            }, 300);
        }

        return () => dialog.removeEventListener("cancel", onCancel);
    }, [isOpen]);

    useEffect(() => {
        const onPop = () => {
            if (!isOpenRef.current) return;
            pushedRef.current = false;
            setIsOpen(false);
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    return (
        <>
            <AddIcon onClick={() => setIsOpen(true)} />
            <AddDialog onClose={() => setIsOpen(false)}  dialogRef={dialogRef}/>
        </>
    );
}

