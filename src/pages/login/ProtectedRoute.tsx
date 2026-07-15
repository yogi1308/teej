import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [authed, setAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        fetch("/api/auth/me", { credentials: "include" })
            .then(r => r.json())
            .then(body => setAuthed(body.success && !!body.data));
    }, []);

    if (authed === null) return null;
    if (!authed) return <Navigate to="/login" replace />;
    return children;
}
