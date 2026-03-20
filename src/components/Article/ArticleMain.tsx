import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Card } from "../Types/typeTiptap";

interface ArticleCardProps {
  card: Card;
}

export const ArticleMain = ({ card }: ArticleCardProps) => {
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Фонове фото */}
      {card.backgroundImage && (
        <div className="w-full h-[200px] overflow-hidden">
          <img
            src={card.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Заголовок */}
      <div className="px-6 pt-5 pb-2">
        <h2 className="text-white font-bold text-2xl">{card.publishedTitle}</h2>
        <p className="text-zinc-500 text-xs mt-1">
          {new Date(card.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Контент */}
      <ScrollArea className="h-[500px]">
        <div className="px-6 py-4 text-zinc-100">
          <EditorContent editor={editor} />
        </div>
      </ScrollArea>
    </div>
  );
};
