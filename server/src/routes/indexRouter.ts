import express, { Router } from "express";
import { deleteItem, deleteHomeSocialLink, getHome, updateHomeSocialLinks } from "../queries";
import { deleteFromCloudinary } from "../cloudinary";
import { requireAdmin } from "../../auth/middleware";

const indexRouter = Router();

indexRouter.post("/delete", requireAdmin, express.json(), async (req, res) => {
    try {
        const { id, type } = req.body;
        const assetIds = (await deleteItem(id, type))?.filter((id): id is string => !!id);
        if (assetIds?.length) {
            const result = await deleteFromCloudinary(assetIds)
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

indexRouter.post("/delete-social-link", requireAdmin, express.json(), async (req, res) => {
    try {
        const { index } = req.body;
        await deleteHomeSocialLink(index);
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

indexRouter.get("/", async (req, res) => {
    try {
        const home = await getHome();
        res.json(home ?? { socialLinks: [] });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

indexRouter.post("/", requireAdmin, express.json(), async (req, res) => {
    try {
        const { socialLinks } = req.body;
        await updateHomeSocialLinks(socialLinks ?? []);
        res.json({ success: true });
    } catch (error: any) {
        console.error("Failed to save social links:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default indexRouter;
