import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/react";
import { EditorToolbar } from "@/components/ToolBar/EditorToolbar";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  placeholder?: string;
  onChange?: (json: JSONContent, plainText: string) => void;
}

export const RichTextEditor = ({
  placeholder = "Введіть ваш текст...",
  onChange,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Виключаємо те що підключаємо окремо
        strike: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      if (!onChange) return;
      const json = editor.getJSON();
      const plainText = editor.getText();
      onChange(json, plainText);
    },
  });

  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;

      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const src = readerEvent.target?.result as string;
        (editor as any).chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="rich-editor-wrapper">
      <EditorToolbar editor={editor} onImageInsert={handleImageInsert} />
      <EditorContent editor={editor} className="rich-editor-content" />
    </div>
  );
};
