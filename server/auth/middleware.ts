import { verifyToken } from "./jwt.js";

export function requireAdmin(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ success: false, error: "Unauthorized" });
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ success: false, error: "Invalid token" });
    req.userId = payload.userId;
    next();
}
