import { Router } from "express";
import { upload } from "../multer";
import { deleteFromCloudinary, uploadImageToCloudinary } from "../cloudinary";
import { getAllMerch, getMerch, merchUploadQuery } from "../queries";
import { prisma } from "../../prisma/prisma";
import { requireAdmin } from "../../auth/middleware";

const merchRouter = Router();

merchRouter.post("/", requireAdmin, upload.array("images"), async (req, res, next) => {
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

merchRouter.put("/:id", requireAdmin, upload.array("images"), async (req, res) => {
    try {
        const existing = await prisma.merch.findUnique({ where: { id: req.params.id as string } });
        if (!existing) return res.status(404).json({ success: false, error: "Merch not found" });

        const data: any = {};
        const oldAssets: string[] = [];

        if (req.body.imgsChange === "true") {
            const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
            const files = req.files as Express.Multer.File[];
            const imgsUrl: string[] = JSON.parse(req.body.imgsUrl || "[]");
            const deleteIds: string[] = JSON.parse(req.body.imgsAssetIds || "[]");

            const newUploads = files?.length
                ? await Promise.all(files.map(f => uploadImageToCloudinary(f.buffer, `${stage}/merch`)))
                : [];

            let newIdx = 0;
            const newImageUrl: string[] = [];
            const newImageAssetId: string[] = [];

            for (const url of imgsUrl) {
                if (url.startsWith("blob:") && newUploads[newIdx]) {
                    const u = newUploads[newIdx++];
                    newImageUrl.push(u.secure_url);
                    newImageAssetId.push(u.asset_id);
                } else {
                    newImageUrl.push(url);
                    const idx = (existing.imageUrl || []).indexOf(url);
                    newImageAssetId.push(idx >= 0 && existing.imageAssetId?.[idx] ? existing.imageAssetId[idx] : "");
                }
            }

            data.imageUrl = newImageUrl;
            data.imageAssetId = newImageAssetId;

            const kept = new Set(newImageAssetId);
            for (const id of deleteIds) if (!kept.has(id)) oldAssets.push(id);
        }

        if (req.body.title) data.title = req.body.title;
        if (req.body.description) data.description = req.body.description;
        if (req.body.sizes) data.sizes = req.body.sizes;
        if (req.body.inStock) data.inStock = parseInt(req.body.inStock, 10);
        if (req.body.meta) data.meta = Number(req.body.meta).toFixed(2);

        if (oldAssets.length) await deleteFromCloudinary(oldAssets);
        await prisma.merch.update({ where: { id: req.params.id as string }, data });
        res.json({ success: true });
    } catch (error) {
        console.error("PUT /merch/:id error:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});

export default merchRouter
