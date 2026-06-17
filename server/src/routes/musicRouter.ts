import { Router } from "express";
import { uploadToCloudinary } from "../cloudinary";
import { upload } from "../multer";

const musicRouter = Router();
musicRouter.post(
    "/",
    upload.fields([{ name: "track" }, { name: "cover-art" }]),
    uploadToCloudinary,
    (req, res) => {
        console.log(req.body);
        res.status(200).json({ success: true, message: "Music uploaded" });
    },
);

export default musicRouter;
