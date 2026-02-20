import "./marquee.css"

const bgImages = Object.values(
  import.meta.glob("../assets/bg/*.{png,jpg,gif}", {
    eager: true,
    import: "default",
  }),
) as string[];

function shuffleImages(array: string[]) {
    const shuffled = []
    const copiedArray = [...array]
    while (copiedArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copiedArray.length)
        shuffled.push(copiedArray[randomIndex])
        copiedArray.splice(randomIndex, 1);
    }
    return shuffled
}

export default function MarqueeColumn({ direction }: { direction: "up" | "down" }) {
  let shuffledImages = shuffleImages(bgImages);
  shuffledImages = [...shuffledImages, ...shuffledImages];
  const animationClass =
    direction === "up"
      ? `[animation:marquee-up_200s_linear_infinite]`
      : `[animation:marquee-down_200s_linear_infinite]`;
  return (
    <div
      className={`flex flex-col gap-2 ${animationClass}`}
      style={{ width: "calc(100vh / var(--columns-count))" }}
    >
      {shuffledImages.map((src, i) => (
        <img key={i} src={src} className="object-contain rounded-lg" />
      ))}
    </div>
  );
}