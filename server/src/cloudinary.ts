import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export async function uploadToCloudinary(req, res, next) {
    try {
        // Tell TypeScript that req.files has named fields (like "track", "cover-art"),
        // each containing an array of uploaded file objects — or might be undefined.
        const files = req.files as
            | Record<string, Express.Multer.File[]>
            | undefined;
        const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
        const entity = req.baseUrl.includes("music")
            ? "music"
            : req.baseUrl.includes("merch")
                ? "merch"
                : req.baseUrl.includes("blog")
                    ? "blog"
                    : "";
        const folder = `${stage}/${entity}`;
        req.uploads = {};

        if (files?.["track"]?.[0]) {
            req.uploads.track = await uploadVideoToCloudinary(
                files["track"][0].buffer,
                folder,
            );
        }
        if (files?.["cover-art"]?.[0]) {
            req.uploads.cover = await uploadImageToCloudinary(
                files["cover-art"][0].buffer,
                folder,
            );
        }

        next();
    } catch (error) {
        console.error("uploadToCloudinary error:", error);
        next(error);
    }
}

export async function uploadImageToCloudinary(buffer: Buffer, folder: string) {
    // Wrap Cloudinary's callback-based upload in a Promise so we can await it
    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
    return uploadResult;
}

export async function uploadVideoToCloudinary(buffer: Buffer, folder: string) {
    // Wrap Cloudinary's callback-based upload in a Promise so we can await it
    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ resource_type: "video", folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
    return uploadResult;
}
