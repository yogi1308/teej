import { useState } from "react";
import GradientBorders from "@/components/GradientBorders";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const form = e.currentTarget;
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ password: form.password.value }),
        });
        const body = await res.json();
        if (body.success) navigate("/admin");
        else setError(body.error || "Wrong password");
    }

    return (
        <div className="flex flex-col items-center gap-4 p-8 absolute top-1/2 left-1/2 -translate-1/2">
        <GradientBorders />
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input name="password" type="password" placeholder="Password" required className="border px-4 py-2" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="px-6 py-2 bg-white text-black cursor-pointer w-full">Login</button>
            </form>
            <button onClick={() => navigate("/")} className="text-white/50 hover:text-white cursor-pointer">Back to site</button>
        </div>
    );
}
