import { Router } from "express";
import { signToken, verifyToken } from "../../auth/jwt.js";
import express from "express"

const authRouter = Router();
authRouter.use(express.json());

authRouter.post("/login", (req, res) => {
    const { password } = req.body;
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: "Invalid password" });
    }
    const token = signToken("admin");
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, data: { authenticated: true } });
});

authRouter.post("/logout", (_req, res) => {
    res.clearCookie("token", { path: "/" });
    res.json({ success: true });
});

authRouter.get("/me", (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.json({ success: true, data: null });
    const payload = verifyToken(token);
    if (!payload) return res.json({ success: true, data: null });
    res.json({ success: true, data: { authenticated: true } });
});

export default authRouter;
