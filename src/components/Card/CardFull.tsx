import { CardActions } from "./CardActions";
import { CardExpandedContent } from "./CardExpanded";
import type { Card } from "../Types/typeTiptap";
import { ScrollArea } from "../ui/scroll-area";

interface CardFullProps {
  card: Card;
  onClose: (e: React.MouseEvent) => void;
  onDelete: () => void;
}

export const CardFull = ({ onClose, onDelete, card }: CardFullProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Full картка */}
      <div className="fixed inset-[5%] z-50 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <CardActions onDelete={onDelete} />

        <ScrollArea className="flex-1 min-h-0">
          <CardExpandedContent card={card} variant="full" />
        </ScrollArea>

        <div className="shrink-0 border-t border-zinc-800 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 hover:text-zinc-200 transition-all"
          >
            ✕ Close
          </button>
        </div>
      </div>
    </>
  );
};
