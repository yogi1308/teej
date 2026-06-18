import { useRef } from "react";
import AddDialog from "./AddDialog";
import AddIcon from "./AddIcon";

export default function Add({ tab, refetch } : { tab: "Merch" | "Music" | "Blog" | "Home"; refetch: () => void}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    return (
        <>
            <AddIcon onClick={() => { dialogRef.current?.showModal(); }} />
            <AddDialog tab={tab} dialogRef={dialogRef} refetch={refetch} />
        </>
    );
}
