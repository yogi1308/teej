import { Router } from "express";
import { uploadImageToCloudinary, uploadToCloudinary } from "../cloudinary";
import { upload } from "../multer";
import { musicUpload, getMusic, albumArtUploadQuery, getAlbum } from "../queries";
import { requireAdmin } from "../../auth/middleware";

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

musicRouter.post(
    "/albums",
    requireAdmin,
    upload.single("cover-art"),
    async (req, res, next)  => {
        try {
            const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
            if (!req.file) return res.status(400).json({ success: false, error: "Cover required" });
            const result = await uploadImageToCloudinary(req.file?.buffer, `${stage}/music`);
            const albumArtQuery = await albumArtUploadQuery(req, result)
            res.json({albumId: albumArtQuery })
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error });
        }
    },
);

musicRouter.post(
    "/albums/:id/tracks",
    requireAdmin,
    upload.fields([{name: "track"}]),
    uploadToCloudinary,
    musicUpload,
    (req, res) => {
        res.status(200).json({ success: true, message: "Music uploaded" });
    },
)

musicRouter.get("/albums/:id", async (req, res) => {
    try {
        const music = await getAlbum(req.params.id);
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch music" });
    }
});

export default musicRouter;
