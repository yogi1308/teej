import { useRef, useEffect, useState } from "react";

export default function MainContent({ content, currItem, setCurrItem }) {
    const ulRef = useRef(null);
    const currRef = useRef(currItem);
    currRef.current = currItem;
    const [ulHeight, setUlHeight] = useState(0);

    useEffect(() => {
        if (ulRef.current) {
            setUlHeight(ulRef.current.offsetHeight);
        }
    }, [content]);

    useEffect(() => {
        if (content.length > 0) {
            const exists = currItem && content.some(c => c.id === currItem.id);
            if (!exists) setCurrItem(content[0]);
        }
    }, [content]);

    useEffect(() => {
        const container = ulRef.current;
        if (!container || content.length === 0) return;

        function onScroll() {
            if (container.scrollTop <= 0) {
                const first = content[0];
                if (first && first.id !== currRef.current?.id) setCurrItem(first);
            }
        }

        container.addEventListener("scroll", onScroll, { passive: true });

        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-id");
                        const item = content.find(c => c.id === id);
                        if (item && item.id !== currRef.current?.id) {
                            setCurrItem(item);
                        }
                        break;
                    }
                }
            },
            {
                root: container,
                rootMargin: "10% 0px -103% 0px",
                threshold: 0,
            },
        );

        for (const li of container.querySelectorAll("li[data-id]")) {
            observer.observe(li);
        }
        return () => {
            observer.disconnect();
            container.removeEventListener("scroll", onScroll);
        };
    }, [content]);

    return (
        <div className="absolute bottom-0 top-1/2 h-1/2 w-full px-1 overflow-hidden ">
            <div className="flex justify-between border-y border-white/50 relative py-2 backdrop-blur-md bg-black/15 z-10">
                <p className="truncate">{currItem?.title}</p>
                <p className="truncate">{currItem?.meta || "Album"}</p>
            </div>
            <ul ref={ulRef} className="h-full overflow-y-auto no-scrollbar " style={{ paddingBottom: ulHeight }}>
                {content.map((item, i) => (
                    <li
                        className={`flex justify-between my-4 ${i === 0 ? "h-0" : ""}`}
                        key={item.id}
                        data-id={item.id}
                    >
                        <p className="truncate">{item?.title}</p>
                        <p className="truncate">{item?.meta || "Album"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
