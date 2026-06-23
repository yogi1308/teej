import type { Editor } from "@tiptap/core";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import type { EditorStateSnapshot } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Details, DetailsSummary, DetailsContent } from "@tiptap/extension-details";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import type { ReactNode } from "react";
import BoldSVG from "../../assets/svg/BoldSVG";
import Italic from "../../assets/svg/Italic";
import UnderlineSVG from "../../assets/svg/UnderlineSVG.tsx";
import Bullets from "../../assets/svg/Bullets";
import NumberedBullets from "../../assets/svg/NumberedBullets";
import Undo from "../../assets/svg/Undo";
import Redo from "../../assets/svg/Redo";
import BlockQuoteSVG from "../../assets/svg/BlockQuoteSVG";
import Codeblock from "../../assets/svg/Codeblock";
import StrikeSVG from "../../assets/svg/StrikeSVG.tsx";
import HighlightSVG from "../../assets/svg/HighlightSVG.tsx";

const lowlight = createLowlight(all);

function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStike: ctx.editor.isActive("strike") ?? false,
        isHightlight: ctx.editor.isActive("highlight") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isDetails: ctx.editor.isActive("details") ?? false,
    };
}

function MenuBar({ editor }: { editor: Editor | null }) {
    const s = useEditorState({ editor, selector: menuBarStateSelector });

    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-0.5 divide-x divide-white border-b border-white p-1">
            <div className="flex items-center">
                <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={s.isBold} label={<BoldSVG />} tooltip="Bold" />
                <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={s.isItalic} label={<Italic />} tooltip="Italic" />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={s.isUnderline}
                    label={<UnderlineSVG />}
                    tooltip="Underline"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    active={s.isStike}
                    label={<StrikeSVG />}
                    tooltip="Strikethrough"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    active={s.isHightlight}
                    label={<HighlightSVG />}
                    tooltip="Highlight"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={s.isHeading1}
                    label="H1"
                    tooltip="Heading 1"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={s.isHeading2}
                    label="H2"
                    tooltip="Heading 2"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={s.isHeading3}
                    label="H3"
                    tooltip="Heading 3"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={s.isBulletList}
                    label={<Bullets />}
                    tooltip="Bullet List"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={s.isOrderedList}
                    label={<NumberedBullets />}
                    tooltip="Numbered List"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} label={<Undo />} tooltip="Undo" />
                <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} label={<Redo />} tooltip="Redo" />
            </div>
            <div className="flex items-center">
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={s.isBlockquote}
                    label={<BlockQuoteSVG />}
                    tooltip="Blockquote"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={s.isCodeBlock}
                    label={<Codeblock />}
                    tooltip="Code block"
                />
                <ToolBtn
                    onClick={() => {
                        if (editor.isActive("details")) {
                            editor.chain().focus().unsetDetails().run();
                        } else {
                            editor.chain().focus().setDetails().run();
                        }
                    }}
                    active={s.isDetails}
                    label="▶"
                    tooltip="Details"
                />
            </div>
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

export default function TipTap({ value }: { value?: string }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            UnderlineExtension,
            Highlight.configure({ multicolor: true }),
            CodeBlockLowlight.configure({ lowlight, enableTabIndentation: true, tabSize: 2 }),
            Details.configure({
                persist: true,
                renderToggleButton: ({ element, isOpen }) => {
                    element.textContent = isOpen ? "▼" : "▶";

                    const wrapper = element.parentElement;
                    if (wrapper && !wrapper.dataset.toggleReady) {
                        wrapper.dataset.toggleReady = "true";
                        wrapper.addEventListener("click", e => {
                            const target = e.target as HTMLElement;
                            if (!target.closest('[data-type="detailsContent"]') && target !== element) {
                                element.click();
                            }
                        });
                    }
                },
            }),
            DetailsSummary,
            DetailsContent,
        ],
        content: value ?? "",
    });

    if (!editor) return null;

    return (
        <div className="border border-white bg-black font-sans flex-1">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="p-4 text-white" />
        </div>
    );
}
