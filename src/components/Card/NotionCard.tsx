import { useEffect, useState } from "react";
import type { Card } from "../Types/typeTiptap";
import { useCardStore } from "@/store/useCardStore";
import { CardActions } from "./CardActions";
import { CardCollapsed } from "./CardCollapsed";
import { CardExpandedContent } from "./CardExpanded";
import { CardFull } from "./CardFull";
import { PublishDialog } from "./PublishDialog";

interface NotionCardProps {
  card: Card;
}

export const NotionCard = ({ card }: NotionCardProps) => {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const publishCard = useCardStore((s) => s.publishCard);
  const unpublishCard = useCardStore((s) => s.unpublishCard);
  const setCardState = useCardStore((s) => s.setCardState);
  const deleteCard = useCardStore((s) => s.deleteCard);
  const startEditing = useCardStore((s) => s.startEditing);
  const state = useCardStore((s) => s.uiStates[card.id] ?? "collapsed");

  // Закриваємо full view по Esc
  useEffect(() => {
    if (state !== "full") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCardState(card.id, "expanded");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, card.id, setCardState]);

  const handleCardClick = () => {
    if (state === "full") return;
    setCardState(card.id, state === "collapsed" ? "expanded" : "collapsed");
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardState(card.id, "full");
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardState(card.id, "expanded");
  };

  // --- Full view ---
  if (state === "full") {
    return (
      <CardFull
        onClose={handleClose}
        onDelete={() => deleteCard(card.id)}
        card={card}
      />
    );
  }

  const handlePublish = (title: string) => {
    publishCard(card.id, title);
  };

  const handlePublishClick = () => {
    if (card.isPublished) {
      unpublishCard(card.id);
    } else {
      setPublishDialogOpen(true);
    }
  };

  // --- Collapsed + Expanded ---
  return (
    <>
      <PublishDialog
        open={publishDialogOpen}
        onClose={() => setPublishDialogOpen(false)}
        onConfirm={handlePublish}
      />

      <div
        onClick={handleCardClick}
        className={`
  group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden
  cursor-pointer transition-all duration-300
  hover:border-zinc-600 hover:-translate-y-0.5 hover:shadow-xl
`}
      >
        {state === "collapsed" ? (
          <div className="h-[160px]">
            <CardCollapsed card={card} />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="relative">
              <CardActions
                onDelete={() => deleteCard(card.id)}
                onEdit={() => startEditing(card.id)}
                onPublish={handlePublishClick}
                isPublished={card.isPublished}
              />
              <CardExpandedContent card={card} />
            </div>

            <div
              className="border-t border-zinc-800 px-4 py-2 flex justify-between items-center bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-zinc-600 text-xs">
                {new Date(card.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={handleOpen}
                className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-700 hover:text-zinc-200 transition-all"
              >
                OPEN ↗
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
