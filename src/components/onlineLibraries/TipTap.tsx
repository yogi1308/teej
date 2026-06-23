import { type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TipTap({ value, onEditorChange }: { value?: string; onEditorChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value ?? "",
        onUpdate: ({ editor }) => onEditorChange?.(editor.getHTML()),
    });

    if (!editor) return null;

    return (
        <div className="border border-white bg-black font-sans">
            <div className="flex flex-wrap gap-0.5 divide-x divide-white border-b border-white p-1">
                <div>
                    <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="B" tooltip="Bold" />
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive("italic")}
                        label="I"
                        tooltip="Italic"
                    />
                </div>
                <div>
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive("heading", { level: 1 })}
                        label="H1"
                        tooltip="Heading 1"
                    />
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive("heading", { level: 2 })}
                        label="H2"
                        tooltip="Heading 2"
                    />
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive("heading", { level: 3 })}
                        label="H3"
                        tooltip="Heading 3"
                    />
                </div>
                <div>
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive("bulletList")}
                        label="*"
                        tooltip="Bullet List"
                    />
                    <ToolBtn
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive("orderedList")}
                        label="1."
                        tooltip="Numbered List"
                    />
                </div>
                <div>
                    <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} label="<" tooltip="Undo" />
                    <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} label=">" tooltip="Redo" />
                </div>
            </div>
            <EditorContent editor={editor} className="p-4 text-white" />
        </div>
    );
}

function ToolBtn({
    onClick,
    active,
    label,
    tooltip,
    children,
}: {
    onClick: () => void;
    active: boolean;
    label?: ReactNode;
    tooltip: string;
    children?: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={tooltip}
            className={`px-3 py-1 text-sm transition-colors ${active ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
        >
            {label ?? children}
        </button>
    );
}
