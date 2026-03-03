import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import type { Card } from "../Types/typeTiptap";

interface CardExpandedProps {
  card: Card;
}

export const CardExpandedContent = ({ card }: CardExpandedProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: card.content,
    editable: false,
  });

  return (
    <div className="flex flex-col w-full h-full">
      {/* Фото зверху як header — тільки якщо є */}
      {card.backgroundImage && (
        <div className="w-full h-[140px] shrink-0 overflow-hidden">
          <img
            src={card.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Текст на чорному фоні */}
      <div className="flex-1 overflow-y-auto p-4 bg-zinc-900 text-zinc-100">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
