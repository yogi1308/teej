import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef } from "react";

export default function TipTap({ value, onEditorChange }: { value?: string; onEditorChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            Image,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Start writing..." }),
        ],
        content: value ?? "",
        onUpdate: ({ editor }) => onEditorChange?.(editor.getHTML()),
    });
    const imgRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    async function addImage(file: File) {
        const form = new FormData();
        form.append("image", file);
        const res = await fetch("/api/upload/image", { method: "POST", body: form });
        if (!res.ok) return;
        const { url } = await res.json();
        editor.chain().focus().setImage({ src: url }).run();
    }

    function toggleLink() {
        if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
        } else {
            const url = prompt("Link URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
        }
    }

    return (
        <div className="border border-white bg-black">
            <input type="file" accept="image/*" hidden ref={imgRef} onChange={(e) => { const f = e.target.files?.[0]; if (f) addImage(f); }} />
            <div className="flex flex-wrap gap-0.5 border-b border-white p-1">
                <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="B" />
                <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="I" />
                <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} label="U" />
                <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="S" />
                <span className="w-px bg-white/20 mx-1" />
                <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} label="H1" />
                <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="H2" />
                <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="H3" />
                <span className="w-px bg-white/20 mx-1" />
                <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="•" />
                <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="1." />
                <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label={'"'} />
                <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} label="<>" />
                <span className="w-px bg-white/20 mx-1" />
                <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} label="L" />
                <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} label="C" />
                <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} label="R" />
                <span className="w-px bg-white/20 mx-1" />
                <ToolBtn onClick={toggleLink} active={editor.isActive("link")} label="🔗" />
                <ToolBtn onClick={() => imgRef.current?.click()} active={false} label="🖼" />
                <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} label="←" />
                <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} label="→" />
            </div>
            <EditorContent editor={editor} className="text-white p-4" />
        </div>
    );
}

function ToolBtn({ onClick, active, label }: { onClick: () => void; active: boolean; label: string }) {
    return (
        <button type="button" onClick={onClick} className={`px-3 py-1 text-sm transition-colors ${active ? "bg-white text-black" : "text-white hover:bg-white/10"}`}>
            {label}
        </button>
    );
}
