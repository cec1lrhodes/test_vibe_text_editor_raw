import { useEditor, EditorContent } from "@tiptap/react"
import { useRef } from "react"
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/react";
import { EditorToolbar } from "@/components/ToolBar/EditorToolbar";
import "./RichTextEditor.css";
import { compressImage } from "../utils/compressImage";

interface RichTextEditorProps {
  placeholder?: string;
  onChange?: (json: JSONContent, plainText: string) => void;
  initialContent?: JSONContent;
}

export const RichTextEditor = ({
  placeholder = "Введіть ваш текст...",
  onChange,
  initialContent,
}: RichTextEditorProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null)

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
    content: initialContent ?? "",
    onUpdate({ editor }) {
      if (!onChange) return;
      const json = editor.getJSON();
      const plainText = editor.getText();
      onChange(json, plainText);
    },
  });

  const handleImageInsert = () => {
    imageInputRef.current?.click()
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    const reader = new FileReader()
    reader.onload = async (readerEvent) => {
      const src = readerEvent.target?.result as string
      const compressed = await compressImage(src, 800, 0.6)
      ;(editor as any).chain().focus().setImage({ src: compressed }).run()
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  return (
    <div className="rich-editor-wrapper">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />
      <EditorToolbar editor={editor} onImageInsert={handleImageInsert} />
      <EditorContent editor={editor} className="rich-editor-content" />
    </div>
  )
}
