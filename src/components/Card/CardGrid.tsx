import { useCardsQuery } from "@/hooks/useCards";
import { NotionCard } from "./NotionCard";

export const CardsGrid = () => {
  const { data: cards = [], isLoading, isError } = useCardsQuery();

  if (isLoading) {
    return <p className="text-zinc-600 text-sm text-center mt-4">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-sm text-center mt-4">
        Failed to load cards. Is the server running?
      </p>
    );
  }

  if (cards.length === 0) {
    return (
      <p className="text-zinc-600 text-sm text-center mt-4">
        After adding, cards will appear here.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      {cards.map((card) => (
        <NotionCard key={card.id} card={card} />
      ))}
    </div>
  );
};
