import { useEffect, useRef, useState } from "react";
import AddDialog from "./AddDialog";
import AddIcon from "./AddIcon";

export default function Add({ refetch } : { tab: "Merch" | "Music" | "Blog" | "Home"; refetch?: () => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const opened = useRef(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            opened.current = true;
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.showModal();
                requestAnimationFrame(() => {
                    dialog.style.transform = "scaleY(1)";
                });
            }, 10);
            dialog.style.display = "flex"
        } else if (opened.current) {
            dialog.style.transform = "scaleY(0)";
            setTimeout(() => {
                dialog.close();
            }, 300);
        }
    }, [isOpen]);

    return (
        <>
            <AddIcon onClick={() => setIsOpen(true)} />
            <AddDialog onClose={() => setIsOpen(false)} refetch={refetch} dialogRef={dialogRef}/>
        </>
    );
}

