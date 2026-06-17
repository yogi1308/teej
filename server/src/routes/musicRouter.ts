import { Router } from "express";
import { uploadToCloudinary } from "../cloudinary";
import { upload } from "../multer";
import { musicUpload } from "../queries";

const musicRouter = Router();
musicRouter.post(
    "/",
    upload.fields([{ name: "track" }, { name: "cover-art" }]),
    uploadToCloudinary,
    musicUpload,
    (req, res) => {
        console.log(req.body);
        res.status(200).json({ success: true, message: "Music uploaded" });
    },
);

export default musicRouter;
