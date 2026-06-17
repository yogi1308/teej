import { prisma } from "../prisma/prisma";

export async function musicUpload(req, res, next) {
    try {
        console.log(req.uploads);
        console.log(req.body, "from queies")
        for (song in req.uploads) {
            await prisma.music.create({
                data: {
                    title: req.body.title,
                    imageUrl: song
                }
            });
        }
        next();
    } catch (error) {
        console.error(error);
    }
}

[
    {
        track: {
            asset_id: "4cffa3cdd3b3b323919d477a7c5f811d",
            public_id: "dev/music/a2rhqno1kkewdic4bz6l",
            version: 1781724215,
            version_id: "b9ee875bccfaf7ab8dfef5b76af4e3c4",
            signature: "3711254466d9db3582c1f805e412bff8bba21f9a",
            width: 500,
            height: 500,
            format: "mp3",
            resource_type: "video",
            created_at: "2026-06-17T19:23:35Z",
            tags: [],
            pages: 0,
            bytes: 5725292,
            type: "upload",
            etag: "d101b73c10bdfd61363f95c972cdab14",
            placeholder: false,
            url: "http://res.cloudinary.com/dughggpdv/video/upload/v1781724215/dev/music/a2rhqno1kkewdic4bz6l.mp3",
            secure_url:
                "https://res.cloudinary.com/dughggpdv/video/upload/v1781724215/dev/music/a2rhqno1kkewdic4bz6l.mp3",
            playback_url:
                "https://res.cloudinary.com/dughggpdv/video/upload/sp_auto/v1781724215/dev/music/a2rhqno1kkewdic4bz6l.m3u8",
            asset_folder: "dev/music",
            display_name: "a2rhqno1kkewdic4bz6l",
            audio: [Object],
            video: [Object],
            is_audio: false,
            frame_rate: 90000,
            bit_rate: 255966,
            duration: 178.938776,
            rotation: 0,
            original_filename: "file",
            api_key: "599296658712548",
        },
        cover: {
            asset_id: "5a7b286f2345a46895004757eec82be9",
            public_id: "dev/music/tpxfhmd8yfhbliryhdb3",
            version: 1781724216,
            version_id: "144c25cb79ae62b0439404d18d154728",
            signature: "648a0d8a074d4b705cc038aa282c986c51b77a8e",
            width: 964,
            height: 1062,
            format: "png",
            resource_type: "image",
            created_at: "2026-06-17T19:23:36Z",
            tags: [],
            bytes: 54565,
            type: "upload",
            etag: "6c9f403f2cb869aae40c9c42a3be3706",
            placeholder: false,
            url: "http://res.cloudinary.com/dughggpdv/image/upload/v1781724216/dev/music/tpxfhmd8yfhbliryhdb3.png",
            secure_url:
                "https://res.cloudinary.com/dughggpdv/image/upload/v1781724216/dev/music/tpxfhmd8yfhbliryhdb3.png",
            asset_folder: "dev/music",
            display_name: "tpxfhmd8yfhbliryhdb3",
            original_filename: "file",
            api_key: "599296658712548",
        },
    },
];
