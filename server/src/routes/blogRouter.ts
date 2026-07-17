import { Router } from "express";
import { upload } from "../multer";
import { deleteFromCloudinary, uploadImageToCloudinary, uploadRawToCloudinary } from "../cloudinary";
import { blogFileUploadQuery, getAllBlog, getBlog } from "../queries";
import { prisma } from "../../prisma/prisma";
import { requireAdmin } from "../../auth/middleware";

const blogRouter = Router();

blogRouter.post("/", requireAdmin, upload.fields([{ name: "file" }, { name: "cover-art" }]), async (req, res, next) => {
    try {
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        if (!req.files?.["cover-art"] && !req.files?.["file"]) return res.status(400).json({ success: false, error: "Blog Thumbnail Required" });
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
        res.status(500).json({ success: false, error: "Failed to fetch blog" });
    }
});

blogRouter.put("/:id", requireAdmin, upload.fields([{ name: "file" }, { name: "images" }]), async (req, res) => {
    try {
        const existing = await prisma.blog.findUnique({ where: { id: req.params.id as string } });
        if (!existing) return res.status(404).json({ success: false, error: "Blog not found" });

        const data: any = {};
        const oldAssets: string[] = [];

        if (req.body.blogChange === "true") {
            const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
            const files = req.files as Record<string, Express.Multer.File[]> | undefined;
            const isPdf = req.body.blogUploadtype === "upload";

            if (isPdf && files?.["file"]?.[0]) {
                const b = await uploadRawToCloudinary(files["file"][0].buffer, `${stage}/blog`);
                data.contentUrl = b.secure_url; data.contentAssetId = b.asset_id; data.contentType = "pdf";
            } else if (!isPdf && req.body.html) {
                const b = await uploadRawToCloudinary(Buffer.from(req.body.html, "utf-8"), `${stage}/blog`);
                data.contentUrl = b.secure_url; data.contentAssetId = b.asset_id; data.contentType = "html";
            }

            if (files?.["images"]?.[0]) {
                const c = await uploadImageToCloudinary(files["images"][0].buffer, `${stage}/blog`);
                data.imageUrl = c.secure_url; data.imageAssetId = c.asset_id;
            }

            if (existing.contentAssetId) oldAssets.push(existing.contentAssetId);
            if (existing.imageAssetId) oldAssets.push(existing.imageAssetId);
        }

        if (req.body.title) data.title = req.body.title;
        if (req.body.subtitle) data.subtitle = req.body.subtitle;
        if (req.body.description) data.description = req.body.description;

        if (oldAssets.length) await deleteFromCloudinary(oldAssets);
        await prisma.blog.update({ where: { id: req.params.id as string }, data });
        res.json({ success: true });
    } catch (error) {
        console.error("PUT /blog/:id error:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

export default blogRouter;
