import { useEffect } from "react";
import type { Card } from "../Types/typeTiptap";
import { useCardStore } from "@/store/useCardStore";
import { CardActions } from "./CardActions";
import { CardCollapsed } from "./CardCollapsed";
import { CardExpandedContent } from "./CardExpanded";
import { CardFull } from "./CardFull";

interface NotionCardProps {
  card: Card;
}

export const NotionCard = ({ card }: NotionCardProps) => {
  const { setCardState, getCardState, deleteCard } = useCardStore();
  const state = getCardState(card.id);

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

  // --- Collapsed + Expanded ---
  return (
    <div
      onClick={handleCardClick}
      className={`
  group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden
  cursor-pointer transition-all duration-300
  hover:border-zinc-600 hover:-translate-y-0.5 hover:shadow-xl
  ${state === "expanded" ? "row-span-2" : ""}
`}
    >
      {state === "collapsed" ? (
        // Collapsed — фіксована висота
        <div className="h-[160px]">
          <CardCollapsed card={card} />
        </div>
      ) : (
        // Expanded — більша висота + скрол + кнопка OPEN
        <div className="flex flex-col">
          <div className="h-[320px]  relative">
            <CardActions
              onDelete={() => deleteCard(card.id)}
              onEdit={() => {}}
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
  );
};
