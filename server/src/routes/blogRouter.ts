import { Router } from "express";
import { upload } from "../multer";
import { uploadImageToCloudinary, uploadRawToCloudinary } from "../cloudinary";
import { blogFileUploadQuery, getAllBlog, getBlog } from "../queries";

const blogRouter = Router();

blogRouter.post("/", upload.fields([{ name: "file" }, { name: "cover-art" }]), async (req, res, next) => {
    try {
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        if (!req.files?.["cover-art"] && !req.files?.["file"]) return res.status(400).json({ success: false, error: "Cover or file required" });
        const isPdf = !!req.files?.["file"]?.[0];
        const [thumbnailUpload, blogUpload] = await Promise.all([
            req.files?.["cover-art"]?.[0]
                ? uploadImageToCloudinary(req.files["cover-art"][0].buffer, `${stage}/blog`)
                : Promise.resolve(undefined),
            isPdf
                ? uploadRawToCloudinary(req.files["file"][0].buffer, `${stage}/blog`)
                : req.body.html
                    ? uploadRawToCloudinary(Buffer.from(req.body.html, "utf-8"), `${stage}/blog`)
                    : Promise.resolve(undefined),
        ]);
        const created = await blogFileUploadQuery(req, thumbnailUpload, blogUpload, isPdf ? "pdf" : "html");
        res.status(200).json({ success: true, message: "Blog uploaded" });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

blogRouter.get("/", async (req, res) => {
    try {
        const blog = await getAllBlog();
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch blog" });
    }
});

blogRouter.get("/pdf/:id", async (req, res) => {
    try {
        const blog = await getBlog(req.params.id);
        if (!blog?.contentUrl) return res.status(404).end();
        const response = await fetch(blog.contentUrl);
        if (!response.ok) return res.status(502).end();
        const buffer = await response.arrayBuffer();
        res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", "inline; filename=\"document.pdf\"");
        res.send(Buffer.from(buffer));
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch PDF" });
    }
});

blogRouter.get("/:id", async (req, res) => {
    try {
        const blog = await getBlog(req.params.id);
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch music" });
    }
});

export default blogRouter;
