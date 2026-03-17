import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import type { Card } from "../Types/typeTiptap";
import { ScrollArea } from "../ui/scroll-area";

interface CardExpandedProps {
  card: Card;
  variant?: "expanded" | "full";
}

export const CardExpandedContent = ({
  card,
  variant = "expanded",
}: CardExpandedProps) => {
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

  const scrollHeight =
    variant === "full"
      ? "calc(100vh - 180px)"
      : card.backgroundImage
      ? "180px"
      : "320px";

  return (
    <div className="flex flex-col w-full">
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
      <ScrollArea className="bg-zinc-900" style={{ height: scrollHeight }}>
        <div className="p-4 text-zinc-100">
          <EditorContent editor={editor} />
        </div>
      </ScrollArea>
    </div>
  );
};
