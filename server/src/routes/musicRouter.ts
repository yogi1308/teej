import { Router } from "express";
import { uploadToCloudinary } from "../cloudinary";
import { upload } from "../multer";
import { musicUpload, getMusic } from "../queries";

const musicRouter = Router();
musicRouter.post(
    "/upload",
    upload.fields([{ name: "track" }, { name: "cover-art" }]),
    uploadToCloudinary,
    musicUpload,
    (req, res) => {
        res.status(200).json({ success: true, message: "Music uploaded" });
    },
);

musicRouter.get("/get", async (req, res) => {
    try {
        const music = await getMusic();
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch music" });
    }
});

export default musicRouter;
