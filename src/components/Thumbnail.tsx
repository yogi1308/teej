export default function Thumbnail({src, style}) {
    return (
        <img
            src={src}
            className="object-contain"
            style={{ maxHeight: "70vh", maxWidth: "70vw", ...style }}
        />
    )
}
