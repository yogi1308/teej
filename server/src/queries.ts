import { prisma } from "../prisma/prisma";

export async function musicUpload(req, res, next) {
    try {
        const minutes = String(Math.floor(req.uploads.track.duration / 60)).padStart(2, "0");
        const seconds = String(Math.floor(req.uploads.track.duration % 60)).padStart(2, "0");
        await prisma.music.create({
            data: {
                title: req.body.title,
                imageUrl: req.uploads.cover.secure_url,
                album: req.body.album || "Single",
                description: req.body.description,
                releaseDate: req.body.release,
                songUrl: req.uploads.track.secure_url,
                link: req.body.link,
                meta: `${minutes}:${seconds}`,
            },
        });
        next();
    } catch (error) {
        console.error(error);
    }
}

export async function getMusic() {
    try {
        return await prisma.music.findMany()
    } catch (error) {
        console.error(error);
    }
}
