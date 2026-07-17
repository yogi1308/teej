import { useEffect, useState } from "react";
import AddInput from "./AddInput";
import Delete from "@/assets/svg/Delete";

export default function AddHome({homeFormRef}) {
    const [ids, setIds] = useState([0]);

    useEffect(() => {
        setIds(prev => prev.length === 0 ? [Date.now()] : prev);
    }, [ids]);

    return (
        <form ref={homeFormRef} className="flex flex-col gap-4 p-4" onSubmit={e => e.preventDefault()}>
            {ids.map(id => (
                <div key={id} data-row className="flex gap-4 items-end flex-1">
                    <div className="flex-1">
                        <AddInput label="social-name" type="text" name="social-name" placeholder="Instagram, Twitter..." required />
                    </div>
                    <div className="flex-1">
                        <AddInput label="social-link" type="url" name="social-link" placeholder="https://..." required />
                    </div>
                    <div className="cursor-pointer" onClick={() => setIds(prev => prev.filter(x => x !== id))}>
                        <Delete />
                    </div>
                </div>
            ))}
            <button
                className="text-black bg-white border-dashed border-black cursor-pointer"
                type="button"
                onClick={() => setIds(prev => [...prev, Date.now()])}
            >
                +
            </button>
        </form>
    );
}
