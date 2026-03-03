import { type Card } from "../Types/typeTiptap";

interface CardCollapsedProps {
  card: Card;
}

export const CardCollapsed = ({ card }: CardCollapsedProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Фонове фото */}
      {card.backgroundImage && (
        <img
          src={card.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay для читабельності тексту */}
      {card.backgroundImage && <div className="absolute inset-0 bg-black/50" />}

      {/* Plain text */}
      <div className="relative z-10 p-4 h-full flex items-end">
        <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
          {card.plainText}
        </p>
      </div>
    </div>
  );
};
