import { Router } from "express";
import { upload } from "../multer";
import { uploadImageToCloudinary, uploadRawToCloudinary } from "../cloudinary";
import { blogFileUploadQuery, getBlog } from "../queries";

const blogRouter = Router();

blogRouter.post("/", upload.fields([{ name: "file" }, { name: "cover-art" }]), async (req, res, next) => {
    try {
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        if (!req.files?.["cover-art"] && !req.files?.["file"]) return res.status(400).json({ success: false, error: "Cover or file required" });
        const [thumbnailUpload, blogUpload] = await Promise.all([
            req.files?.["cover-art"]?.[0]
                ? uploadImageToCloudinary(req.files["cover-art"][0].buffer, `${stage}/blog`)
                : Promise.resolve(undefined),
            req.files?.["file"]?.[0]
                ? uploadRawToCloudinary(req.files["file"][0].buffer, `${stage}/blog`)
                : req.body.html
                    ? uploadRawToCloudinary(Buffer.from(req.body.html, "utf-8"), `${stage}/blog`)
                    : Promise.resolve(undefined),
        ]);
        const created = await blogFileUploadQuery(req, thumbnailUpload, blogUpload);
        res.status(200).json({ success: true, message: "Blog uploaded" });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

blogRouter.get("/", async (req, res) => {
    try {
        const blog = await getBlog();
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch blog" });
    }
});

export default blogRouter;
