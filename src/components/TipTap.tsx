import type { Editor } from "@tiptap/core";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import type { EditorStateSnapshot } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import UnderlineExtension from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Details, DetailsSummary, DetailsContent } from "@tiptap/extension-details";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { Mathematics } from "@tiptap/extension-mathematics";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { Video } from "./video";

import type { ReactNode } from "react";
import BoldSVG from "../assets/svg/BoldSVG.tsx";
import Italic from "../assets/svg/Italic.tsx";
import UnderlineSVG from "../assets/svg/UnderlineSVG.tsx";
import Bullets from "../assets/svg/Bullets.tsx";
import NumberedBullets from "../assets/svg/NumberedBullets";
import Undo from "../assets/svg/Undo.tsx";
import Redo from "../assets/svg/Redo.tsx";
import BlockQuoteSVG from "../assets/svg/BlockQuoteSVG.tsx";
import Codeblock from "../assets/svg/Codeblock.tsx";
import StrikeSVG from "../assets/svg/StrikeSVG.tsx";
import HighlightSVG from "../assets/svg/HighlightSVG.tsx";
import TasklistSVG from "../assets/svg/TasklistSVG.tsx";
import TableSVG from "../assets/svg/TableSVG.tsx";
import ColumnAddSVG from "../assets/svg/ColumnAddSVG.tsx";
import RowAddSVG from "../assets/svg/RowAddSVG.tsx";
import TableMergeSVG from "../assets/svg/TableMergeSVG.tsx";

import ColumnDeleteSVG from "../assets/svg/ColumnDeleteSVG.tsx";
import RowDeleteSVG from "../assets/svg/RowDeleteSVG.tsx";
import MathSVG from "../assets/svg/MathSVG.tsx";
import BlockMathSVG from "../assets/svg/BlockMathSVG.tsx";
import YoutubeSVG from "../assets/svg/YoutubeSVG.tsx";
import SubscriptSVG from "../assets/svg/SubscriptSVG.tsx";
import SuperscriptSVG from "../assets/svg/SuperscriptSVG.tsx";
import LinkSVG from "../assets/svg/LinkSVG.tsx";
import UploadSVG from "../assets/svg/UploadSVG.tsx";

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
        isTask: ctx.editor.isActive("taskList") ?? false,
        isTable: ctx.editor.isActive("table") ?? false,
        isInlineMath: ctx.editor.isActive("inlineMath") ?? false,
        isBlockMath: ctx.editor.isActive("blockMath") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        fontSize: ctx.editor.getAttributes("textStyle").fontSize ?? "",
        color: ctx.editor.getAttributes("textStyle").color ?? "",
        textAlign: ctx.editor.isActive({ textAlign: "center" })
            ? "center"
            : ctx.editor.isActive({ textAlign: "right" })
                ? "right"
                : ctx.editor.isActive({ textAlign: "justify" })
                    ? "justify"
                    : "left",
        isLink: ctx.editor.isActive("link") ?? false,
    };
}

function MenuBar({ editor }: { editor: Editor }) {
    const s = useEditorState({ editor, selector: menuBarStateSelector });

    return (
        <div className="flex flex-wrap gap-0.5 divide-x divide-white border-b border-white p-1 items-center">
            <div className="flex items-center gap-1">
                <select
                    value={s.fontSize || ""}
                    onChange={e => {
                        const val = e.target.value;
                        if (val) {
                            editor.chain().focus().setFontSize(val).run();
                        } else {
                            editor.chain().focus().unsetFontSize().run();
                        }
                    }}
                    className="bg-transparent text-sm px-1 py-1 border border-white/30 rounded cursor-pointer"
                >
                    <option value="" className="bg-black">
                        Font size
                    </option>
                    <option value="12px" className="bg-black">
                        12px
                    </option>
                    <option value="14px" className="bg-black">
                        14px
                    </option>
                    <option value="16px" className="bg-black">
                        16px
                    </option>
                    <option value="18px" className="bg-black">
                        18px
                    </option>
                    <option value="20px" className="bg-black">
                        20px
                    </option>
                    <option value="24px" className="bg-black">
                        24px
                    </option>
                    <option value="28px" className="bg-black">
                        28px
                    </option>
                    <option value="32px" className="bg-black">
                        32px
                    </option>
                    <option value="36px" className="bg-black">
                        36px
                    </option>
                    <option value="48px" className="bg-black">
                        48px
                    </option>
                    <option value="72px" className="bg-black">
                        72px
                    </option>
                </select>
                <select
                    value={s.color || ""}
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "custom") {
                            const hex = prompt("Enter hex color (e.g. #ff0000):");
                            if (hex) editor.chain().focus().setColor(hex).run();
                        } else if (val) {
                            editor.chain().focus().setColor(val).run();
                        } else {
                            editor.chain().focus().unsetColor().run();
                        }
                    }}
                    className="bg-transparent text-sm px-1 py-1 border border-white/30 rounded cursor-pointer"
                    style={s.color ? { color: s.color } : undefined}
                >
                    <option value="" className="bg-black">
                        Color
                    </option>
                    <option value="#ff0000" className="bg-black" style={{ color: "#ff0000" }}>
                        Red
                    </option>
                    <option value="#0000ff" className="bg-black" style={{ color: "#0000ff" }}>
                        Blue
                    </option>
                    <option value="#ffff00" className="bg-black" style={{ color: "#ffff00" }}>
                        Yellow
                    </option>
                    <option value="#00ff00" className="bg-black" style={{ color: "#00ff00" }}>
                        Green
                    </option>
                    <option value="#800080" className="bg-black" style={{ color: "#800080" }}>
                        Purple
                    </option>
                    <option value="#ffa500" className="bg-black" style={{ color: "#ffa500" }}>
                        Orange
                    </option>
                    <option value="#808080" className="bg-black" style={{ color: "#808080" }}>
                        Gray
                    </option>
                    <option value="#ffffff" className="bg-black" style={{ color: "#ffffff" }}>
                        White
                    </option>
                    <option value="custom" className="bg-black">
                        Custom...
                    </option>
                </select>
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
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    active={s.isSubscript}
                    label={<SubscriptSVG />}
                    tooltip="Subscript"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    active={s.isSuperscript}
                    label={<SuperscriptSVG />}
                    tooltip="Superscript"
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
                <select
                    value={s.textAlign}
                    onChange={e => {
                        const val = e.target.value;
                        if (val === "left") {
                            editor.chain().focus().setTextAlign("left").run();
                        } else {
                            editor.chain().focus().setTextAlign(val).run();
                        }
                    }}
                    className="bg-transparent text-sm px-1 py-1 border border-white/30 rounded cursor-pointer mr-1.25"
                >
                    <option value="left" className="bg-black">
                        Left
                    </option>
                    <option value="center" className="bg-black">
                        Center
                    </option>
                    <option value="right" className="bg-black">
                        Right
                    </option>
                </select>
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
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    active={s.isTask}
                    label={<TasklistSVG />}
                    tooltip="Task List"
                />
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

            <div className="flex items-center">
                <ToolBtn
                    onClick={() => editor.chain().focus().insertTable().run()}
                    active={s.isTable}
                    label={<TableSVG />}
                    tooltip="Insert Table"
                />
                <ToolBtn
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    active={false}
                    label={<ColumnAddSVG />}
                    tooltip="Add Column"
                />
                <ToolBtn onClick={() => editor.chain().focus().addRowAfter().run()} active={false} label={<RowAddSVG />} tooltip="Add Row" />
                <ToolBtn
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    active={false}
                    label={<ColumnDeleteSVG />}
                    tooltip="Delete Column"
                />
                <ToolBtn onClick={() => editor.chain().focus().deleteRow().run()} active={false} label={<RowDeleteSVG />} tooltip="Delete Row" />
                <ToolBtn
                    onClick={() => editor.chain().focus().mergeOrSplit().run()}
                    active={false}
                    label={<TableMergeSVG />}
                    tooltip="Merge/Split"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn
                    onClick={() => {
                        const latex = prompt("Enter LaTeX (inline math):", "x^2 + y^2 = z^2");
                        if (latex != null) {
                            editor.chain().focus().insertInlineMath({ latex }).run();
                        }
                    }}
                    active={s.isInlineMath}
                    label={<MathSVG />}
                    tooltip="Inline Math"
                />
                <ToolBtn
                    onClick={() => {
                        const latex = prompt("Enter LaTeX (block math):", "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}");
                        if (latex != null) {
                            editor.chain().focus().insertBlockMath({ latex }).run();
                        }
                    }}
                    active={s.isBlockMath}
                    label={<BlockMathSVG />}
                    tooltip="Block Math"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn
                    onClick={() => {
                        const url = prompt("Enter YouTube URL:", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                        if (url) {
                            editor.chain().focus().setYoutubeVideo({ src: url }).run();
                        }
                    }}
                    active={false}
                    label={<YoutubeSVG />}
                    tooltip="Insert YouTube Video"
                />
                <ToolBtn
                    onClick={() => {
                        editor.chain().focus().toggleLink().run();
                    }}
                    active={false}
                    label={<LinkSVG />}
                    tooltip="Insert Link"
                />
                <ToolBtn
                    onClick={() => {
                        const url = prompt("Enter image or video URL:");
                        if (url) {
                            if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) {
                                editor.chain().focus().setVideo(url).run();
                            } else {
                                editor.chain().focus().setImage({ src: url }).run();
                            }
                        }
                    }}
                    active={false}
                    label={<UploadSVG />}
                    tooltip="Insert Image or Video"
                />
            </div>
            <div className="flex items-center">
                <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} label={<Undo />} tooltip="Undo" />
                <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} label={<Redo />} tooltip="Redo" />
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
            className={`px-3 py-1 text-sm transition-colors ${active ? "bg-white text-black" : " hover:bg-white/10"}`}
        >
            {label ?? children}
        </button>
    );
}

export default function TipTap({ value, onChange }: { value?: string; onChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false, underline: false }),
            Placeholder.configure({ placeholder: "Start writing your blog..." }),
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
            TaskList,
            TaskItem.configure({ nested: true }),
            TableKit.configure({
                resizable: true,
            }),
            Youtube.configure({ inline: false, controls: true, nocookie: false, allowFullscreen: true }),
            Mathematics.configure({
                inlineOptions: {
                    onClick: (node, pos) => {
                        const latex = prompt("Edit LaTeX:", node.attrs.latex);
                        if (latex != null) {
                            editor.chain().setNodeSelection(pos).updateInlineMath({ latex }).focus().run();
                        }
                    },
                },
                blockOptions: {
                    onClick: (node, pos) => {
                        const latex = prompt("Edit LaTeX:", node.attrs.latex);
                        if (latex != null) {
                            editor.chain().setNodeSelection(pos).updateBlockMath({ latex }).focus().run();
                        }
                    },
                },
                katexOptions: {
                    throwOnError: false,
                },
            }),
            Subscript,
            Superscript,
            TextStyle,
            FontSize.configure({
                types: ["textStyle"],
            }),
            Color.configure({
                types: ["textStyle"],
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
                protocols: ["http", "https"],
                isAllowedUri: (url, ctx) => {
                    try {
                        const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false;
                        }

                        const disallowedProtocols = ["ftp", "file", "mailto"];
                        const protocol = parsedUrl.protocol.replace(":", "");

                        if (disallowedProtocols.includes(protocol)) {
                            return false;
                        }

                        const allowedProtocols = ctx.protocols.map(p => (typeof p === "string" ? p : p.scheme));

                        if (!allowedProtocols.includes(protocol)) {
                            return false;
                        }

                        return true;
                    } catch {
                        return false;
                    }
                },
                shouldAutoLink: url => {
                    try {
                        const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);

                        const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
                        const domain = parsedUrl.hostname;

                        return !disallowedDomains.includes(domain);
                    } catch {
                        return false;
                    }
                },
            }),
            Image,
            Video,
        ],
        content: value ?? "",
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    if (!editor) return null;

    return (
        <div className="border border-white bg-black font-sans flex-1 min-h-[20rem]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="p-4 " />
        </div>
    );
}
