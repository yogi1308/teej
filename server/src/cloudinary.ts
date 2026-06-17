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

// export async function uploadToCloudinary(req, res, next) {
//     try {
//         const uploads = req.files;
//         let uploadURLS = [];
//         for (const file of uploads) {
//             const b64 = Buffer.from(file.buffer).toString("base64");
//             let dataURI = "data:" + file.mimetype + ";base64," + b64;
//
//             const parsedName = path.parse(file.originalname);
//             let public_id = parsedName.base;
//             let counter = 1;
//             let result;
//
//             while (true) {
//                 result = await cloudinary.uploader.upload(dataURI, {
//                     resource_type: "auto",
//                     public_id: `${req.query.folder}/${public_id}`,
//                     overwrite: false,
//                     asset_folder: req.query.folder,
//                 });
//                 if (result.existing) {
//                     public_id = `${parsedName.name} (${counter})${parsedName.ext}`;
//                     counter++;
//                 } else {
//                     break;
//                 }
//             }
//             uploadURLS.push({
//                 name: result.display_name,
//                 dateCreated: new Date(result.created_at),
//                 url: result.secure_url,
//                 folder: result.asset_folder,
//                 size: result.bytes,
//                 asset_id: result.asset_id,
//                 public_id: result.public_id,
//             });
//         }
//         req.uploads = uploadURLS;
//         next();
//     } catch (error) {
//         next(error);
//     }
// };

export async function uploadToCloudinary(req, res, next) {
    try {
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
        console.log("req.files keys:", Object.keys(req.files || {}));
        console.log("req.files track:", req.files?.["track"]?.length);
        console.log("req.files cover-art:", req.files?.["cover-art"]?.length);
        console.log(folder);

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

async function uploadImageToCloudinary(buffer: Buffer, folder: string) {
    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
    return { url: uploadResult.secure_url };
}

async function uploadVideoToCloudinary(buffer: Buffer, folder: string) {
    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ resource_type: "video", folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
    return { url: uploadResult.secure_url, duration: uploadResult.duration };
}
