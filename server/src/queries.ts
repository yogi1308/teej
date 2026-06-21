import { prisma } from "../prisma/prisma";

export async function musicUpload(req, res, next) {
    try {
        const minutes = String(
            Math.floor(req.uploads.track.duration / 60),
        ).padStart(2, "0");
        const seconds = String(
            Math.floor(req.uploads.track.duration % 60),
        ).padStart(2, "0");
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
            prisma.album.findMany(),
            prisma.track.findMany({ where: { albumId: null } }),
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
            },
        });
        return album.id;
    } catch (error) {
        console.error(error);
    }
}

export async function getAlbum(albumId: string) {
    try {
        return await prisma.album.findUnique({
            where: { id: albumId },
            include: { tracks: { orderBy: { trackPosition: "asc" } } },
        });
    } catch (error) {
        console.error(error);
    }
}
