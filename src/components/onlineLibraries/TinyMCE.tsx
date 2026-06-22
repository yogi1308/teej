import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;
console.log(TINY_MCE_API_KEY);

export default function TinyMCE({
    value,
    onEditorChange,
}: {
    value?: string;
    onEditorChange?: (html: string) => void;
}) {
    return (
        <Editor
            apiKey={TINY_MCE_API_KEY}
            value={value}
            onEditorChange={onEditorChange}
            init={{
                plugins: [
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    "code",
                    "fullscreen",
                    "help",
                    "image",
                ],
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist indent outdent | link image media table codesample | charmap emoticons | removeformat code fullscreen help",
                menubar: "file edit insert view format table tools help",
                height: 500,
                branding: false,
            }}
        />
    );
}
