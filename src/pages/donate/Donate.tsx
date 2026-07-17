import { useState } from "react";

export default function Donate() {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const params = new URLSearchParams(location.search);

    if (params.get("success") === "true") {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <p className="text-4xl font-bold text-green-400">Thank you!</p>
                <p className="text-white/60">Your donation means a lot.</p>
            </div>
        );
    }

    const handleDonate = async () => {
        const num = parseFloat(amount);
        if (isNaN(num) || num < 1) {
            setError("Minimum donation is $1");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/donate/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: num }),
            });
            const data = await res.json();
            if (data.success) {
                window.location.href = data.url;
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch {
            setError("Failed to connect to payment server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center gap-6 px-4">
            <p className="text-4xl font-bold text-white/60">Donate</p>
            <p className="text-white/40 text-sm">Support the work — every contribution helps.</p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Amount in USD"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-white/30 rounded p-3 text-center text-lg focus:border-white outline-none bg-transparent text-white"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                    onClick={handleDonate}
                    disabled={loading}
                    className="border border-white p-3 rounded hover:bg-white/10 transition-all disabled:opacity-50 text-white font-semibold"
                >
                    {loading ? "Redirecting to Stripe..." : `Donate ${amount ? `$${amount}` : ""}`}
                </button>
            </div>
            <p className="text-white/30 text-xs mt-4">
                Powered by Stripe. No real charges in test mode.
            </p>
        </div>
    );
}
