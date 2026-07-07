import express from "express";
import { Router } from "express";
import { deleteItem } from "../queries";
import { deleteFromCloudinary } from "../cloudinary";

const indexRouter = Router();

indexRouter.post("/delete", express.json(), async (req, res) => {
    try {
        const { id, type } = req.body;
        console.log("Delete request:", { id, type });
        const assetIds = (await deleteItem(id, type))?.filter((id): id is string => !!id);
        console.log("Asset IDs to delete:", assetIds);
        if (assetIds?.length) {
            const result = await deleteFromCloudinary(assetIds)
            console.log("Cloudinary result:", result);
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

export default indexRouter;
