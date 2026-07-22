import { Router } from "express";
import { deleteFromCloudinary, uploadImageToCloudinary, uploadToCloudinary, uploadVideoToCloudinary } from "../cloudinary.js";
import { upload } from "../multer.js";
import { musicUpload, getMusic, albumArtUploadQuery, getAlbum, updateTrack } from "../queries.js";
import { prisma } from "../../prisma/prisma.js";
import { requireAdmin } from "../../auth/middleware.js";

const musicRouter = Router();
musicRouter.post(
    "/singles",
    requireAdmin,
    upload.fields([{ name: "track" }, { name: "cover-art" }]),
    uploadToCloudinary,
    musicUpload,
    (req, res) => {
        res.status(200).json({ success: true, message: "Music uploaded" });
    },
);

musicRouter.get("/", async (req, res) => {
    try {
        const music = await getMusic();
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch music" });
    }
});

musicRouter.post("/albums", requireAdmin, upload.single("cover-art"), async (req, res, next) => {
    try {
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        if (!req.file) return res.status(400).json({ success: false, error: "Cover required" });
        const result = await uploadImageToCloudinary(req.file?.buffer, `${stage}/music`);
        const albumArtQuery = await albumArtUploadQuery(req, result);
        res.json({ albumId: albumArtQuery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
});

musicRouter.post("/albums/:id/tracks", requireAdmin, upload.fields([{ name: "track" }]), uploadToCloudinary, musicUpload, (req, res) => {
    res.status(200).json({ success: true, message: "Music uploaded" });
});

musicRouter.get("/albums/:id", async (req, res) => {
    try {
        const music = await getAlbum(req.params.id);
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch music" });
    }
});

musicRouter.put("/tracks/:id", requireAdmin, upload.fields([{ name: "track" }, { name: "images" }]), async (req, res) => {
    try {
        const existing = await prisma.track.findUnique({ where: { id: req.params.id as string } });
        if (!existing) return res.status(404).json({ success: false, error: "Track not found" });

        const files = req.files as Record<string, Express.Multer.File[]> | undefined;
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        const data: any = {};
        const oldAssets: string[] = [];

        if (req.body.songsChange === "true") {
            if (files?.["track"]?.[0]) {
                const t = await uploadVideoToCloudinary(files["track"][0].buffer, `${stage}/music`);
                data.songUrl = t.secure_url; data.songAssetId = t.asset_id;
                const m = String(Math.floor(t.duration / 60)).padStart(2, "0");
                const s = String(Math.floor(t.duration % 60)).padStart(2, "0");
                data.meta = `${m}:${s}`;
            }
            if (existing.songAssetId) oldAssets.push(existing.songAssetId);
            if (existing.imageAssetId) oldAssets.push(existing.imageAssetId);
        } else if (req.body.imgsChange === "true" && files?.["images"]?.[0]) {
            const c = await uploadImageToCloudinary(files["images"][0].buffer, `${stage}/music`);
            data.imageUrl = c.secure_url; data.imageAssetId = c.asset_id;
            if (existing.imageAssetId) oldAssets.push(existing.imageAssetId);
        }

        if (req.body.title) data.title = req.body.title;
        if (req.body.description) data.description = req.body.description;
        if (req.body.link) data.link = req.body.link;
        if (req.body.releaseDate) data.releaseDate = req.body.releaseDate;

        if (oldAssets.length) await deleteFromCloudinary(oldAssets);
        await updateTrack(req.params.id as string, data);
        res.json({ success: true });
    } catch (error) {
        console.error("PUT /tracks/:id error:", error);
        res.status(500).json({ success: false, error: (error as Error).message || "Update failed" });
    }
});

musicRouter.put("/albums/:id", requireAdmin, upload.fields([{ name: "images" }]), async (req, res) => {
    try {
        const existing = await prisma.album.findUnique({ where: { id: req.params.id as string } });
        if (!existing) return res.status(404).json({ success: false, error: "Album not found" });

        const files = req.files as Record<string, Express.Multer.File[]> | undefined;
        const data: any = {};
        const oldAssets: string[] = [];

        if (req.body.imgsChange === "true" && files?.["images"]?.[0]) {
            const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
            const c = await uploadImageToCloudinary(files["images"][0].buffer, `${stage}/music`);
            data.coverUrl = c.secure_url; data.coverAssetId = c.asset_id;
            if (existing.coverAssetId) oldAssets.push(existing.coverAssetId);
        }

        if (req.body.title) data.title = req.body.title;
        if (req.body.description) data.description = req.body.description;
        if (req.body.releaseDate) data.releaseDate = req.body.releaseDate;

        if (oldAssets.length) await deleteFromCloudinary(oldAssets);
        await prisma.album.update({ where: { id: req.params.id as string }, data });
        res.json({ success: true });
    } catch (error) {
        console.error("PUT /albums/:id error:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

export default musicRouter;
