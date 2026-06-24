import { useState, useRef } from "react";

export default function AddImage({
    defaultText,
}: {
    defaultText: string;
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                ref={inputRef}
                className="hidden"
                name="cover-art"
                required
            />
            {preview ? (
                <img
                    src={preview}
                    onClick={() => inputRef.current?.click()}
                    className="cursor-pointer border border-dashed border-white object-cover outline-none "
                />
            ) : (
                <button
                    onClick={() => inputRef.current?.click()}
                    className="border border-dashed border-white aspect-square w-full outline-none min-w-60"
                >
                    <p className="!text-4xl text-white/30 cursor-pointer">+</p>
                    {defaultText}
                </button>
            )}
        </div>
    );
}
