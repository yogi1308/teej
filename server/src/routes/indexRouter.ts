import express from "express";
import { Router } from "express";
import { deleteItem } from "../queries";
import { deleteFromCloudinary } from "../cloudinary";

const indexRouter = Router();

indexRouter.post("/delete", express.json(), async (req, res) => {
    try {
        console.log(req.body);
        const assetIds = (await deleteItem(req.body.id, req.body.type))?.filter((id): id is string => !!id);
        if (assetIds?.length) await deleteFromCloudinary(assetIds)
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

export default indexRouter;
