import { useRef } from "react";
import AddDialog from "./AddDialog";
import AddIcon from "./AddIcon";

export default function Add() {
    const dialogRef = useRef(null);
    return (
        <>
            <AddIcon onClick={() => { dialogRef.current?.showModal(); }} />
            <AddDialog dialogRef={dialogRef} />
        </>
    );
}
