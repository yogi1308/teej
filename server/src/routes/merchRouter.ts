import { Router } from "express";
import { upload } from "../multer";
import { uploadImageToCloudinary } from "../cloudinary";
import { getAllMerch, getMerch, merchUploadQuery } from "../queries";

const merchRouter = Router();

merchRouter.post("/", upload.array("images"), async (req, res, next) => {
    try {
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        const files = req.files as Express.Multer.File[]
        if (!files?.length) return res.status(400).json({success: false, error: "Merch Images Required"})
        const merchImages = await Promise.all(files.map(file => uploadImageToCloudinary(file.buffer, `${stage}/merch`))
                                             );
        await merchUploadQuery(req, merchImages)
        res.status(200).json({ success: true, message: "Merch uploaded" });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

merchRouter.get("/", async (req, res) => {
    try {
        const merch = await getAllMerch();
        res.status(200).json({ success: true, data: merch });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch Merch" });
    }
});

merchRouter.get("/:id", async (req, res) => {
    try {
        const merch = await getMerch(req.params.id);
        res.status(200).json({ success: true, data: merch });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch merch" });
    }
});

export default merchRouter
