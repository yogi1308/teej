import { prisma } from "../prisma/prisma";

export async function musicUpload(req, res, next) {
    try {
        console.log(req.body, "from queies");
        await prisma.music.create({
            data: {
                title: req.body.title,
                imageUrl: req.uploads.cover.secure_url,
                album: req.body.album,
                description: req.body.description,
                releaseDate: req.body.release,
                songUrl: req.uploads.track.asset_id,
                link: req.body.link,
                meta: `${String(Math.floor(req.uploads.track.duration / 60)).padStart(2, "0")}:${String(req.uploads.track.duration % 60).padStart(2, "0")}`,
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
