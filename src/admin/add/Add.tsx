import { useState } from "react";
import AddDialog from "./AddDialog";
import AddIcon from "./AddIcon";

export default function Add({ tab, refetch } : { tab: "Merch" | "Music" | "Blog" | "Home"; refetch?: () => void}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <AddIcon onClick={() => setIsOpen(true)} />
            <AddDialog open={isOpen} onClose={() => setIsOpen(false)} tab={tab} refetch={refetch} />
        </>
    );
}
