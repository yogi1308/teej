export default function AddInput({
    label,
    type,
    name,
    defaultValue,
    placeholder,
}: {
    label: string;
    type: string;
    name: string;
    defaultValue?: string;
    placeholder: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-white/50 text-sm uppercase tracking-widest">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onBlur={(event) => {
                    if (event.currentTarget.value.trim() === "" && defaultValue) {
                        event.currentTarget.value = defaultValue;
                    }
                }}
                className="border-b border-white bg-transparent outline-none text-white placeholder:text-white/20"
                required={!!defaultValue}
            />
        </div>
    );
}
