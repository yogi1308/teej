import { prisma } from "../prisma/prisma";
import "dotenv/config";

const env = process.env.NODE_ENV === "production" ? "prod" : "dev";

export async function musicUpload(req, res, next) {
    try {
        const minutes = String(Math.floor(req.uploads.track.duration / 60)).padStart(2, "0");
        const seconds = String(Math.floor(req.uploads.track.duration % 60)).padStart(2, "0");
        await prisma.track.create({
            data: {
                title: req.body.title,
                meta: `${minutes}:${seconds}`,
                songUrl: req.uploads.track.secure_url,
                songAssetId: req.uploads.track.asset_id,
                link: req.body.link,
                imageUrl: req.uploads.cover?.secure_url,
                imageAssetId: req.uploads.cover?.asset_id,
                description: req.body.description ?? null,
                releaseDate: req.body.release ?? null,
                albumId: req.params.id ?? null,
                env: env,
            },
        });
        next();
    } catch (error) {
        console.error(error);
    }
}

export async function getMusic() {
    try {
        const [albums, singles] = await Promise.all([
            prisma.album.findMany({ where: { env: env }, include: { tracks: true } }),
            prisma.track.findMany({ where: { albumId: null, env: env } }),
        ]);
        return [...albums, ...singles];
    } catch (error) {
        console.error(error);
    }
}

export async function albumArtUploadQuery(req, cloudinaryData) {
    try {
        const album = await prisma.album.create({
            data: {
                title: req.body.album,
                coverUrl: cloudinaryData.secure_url,
                coverAssetId: cloudinaryData.asset_id,
                description: req.body.description,
                releaseDate: req.body.releaseDate,
                env: env,
            },
        });
        return album.id;
    } catch (error) {
        console.error(error);
    }
}

export async function getAlbum(albumId: string) {
    try {
        const album = await prisma.album.findUnique({
            where: { id: albumId },
            include: { tracks: { orderBy: { trackPosition: "asc" } } },
        });
        if (!album) return null;
        console.log("ran")
        return {
            ...album,
            tracks: album.tracks.map(t => ({
                ...t,
                coverUrl: t.imageUrl ?? album.coverUrl,
                albumTitle: album.title,
            })),
        };
    } catch (error) {
        console.error(error);
    }
}

export async function blogFileUploadQuery(req, thumbnailUploadData, fileUploadData, contentType?: string) {
    try {
        const upload = await prisma.blog.create({
            data: {
                title: req.body.title,
                subtitle: req.body.subtitle,
                description: req.body.description,
                contentUrl: fileUploadData?.secure_url,
                contentAssetId: fileUploadData?.asset_id,
                contentType: contentType ?? null,
                imageUrl: thumbnailUploadData?.secure_url,
                imageAssetId: thumbnailUploadData?.asset_id,
                env: env,
            },
        });
        return upload;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllBlog() {
    try {
        const blogs = await prisma.blog.findMany({ where: { env: env } });
        return blogs;
    } catch (error) {
        console.error(error);
    }
}

export async function getBlog(blogId: string) {
    try {
        const blogs = await prisma.blog.findUnique({
            where: { id: blogId },
        });
        return blogs;
    } catch (error) {
        console.error(error);
    }
}

export async function merchUploadQuery(req, merchImages) {
    const merchImagesUrls = merchImages.map(img => img.secure_url);
    const merchImagesAssetIds = merchImages.map(img => img.asset_id);
    try {
        const upload = await prisma.merch.create({
            data: {
                title: req.body.title,
                meta: req.body.price,
                imageUrl: merchImagesUrls,
                imageAssetId: merchImagesAssetIds,
                description: req.body.description,
                sizes: req.body.sizes,
                inStock: parseInt(req.body.stock, 10),
                env: env,
            },
        });
        return upload;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMerch() {
    try {
        const merch = await prisma.merch.findMany({ where: { env: env } });
        return merch;
    } catch (error) {
        console.error(error);
    }
}

export async function getMerch(merchId: string) {
    try {
        const blogs = await prisma.merch.findUnique({
            where: { id: merchId },
        });
        return blogs;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteItem(id, type) {
    try {
        if (type === "merch") {
            const res = await prisma.merch.delete({ where: { id: id } });
            return res.imageAssetId;
        } else if (type === "blog") {
            const res = await prisma.blog.delete({ where: { id: id } });
            return [res.imageAssetId, res.contentAssetId];
        } else if (type === "track") {
            const res = await prisma.track.delete({ where: { id: id } });
            return [res.imageAssetId, res.songAssetId]
        }
        else if (type === "album") {
            const res = await prisma.album.delete({ where: { id: id }, include: { tracks: true } })
            return [res.coverAssetId!, ...res.tracks.map(t => t.imageAssetId!)];
        }
    } catch (error) {
        console.error(error);
    }
}
