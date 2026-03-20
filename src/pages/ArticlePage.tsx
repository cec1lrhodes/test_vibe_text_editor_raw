import { Link } from "@tanstack/react-router";
import { useCardStore } from "@/store/useCardStore";
import { ArticleMain } from "@/components/Article/ArticleMain";

const ArticlePage = () => {
  const cards = useCardStore((s) => s.cards);
  const published = cards.filter((c) => c.isPublished);

  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-4">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-zinc-100 text-2xl font-bold">Articles</h1>
          <Link
            to="/notion"
            className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            ← Back to Notion
          </Link>
        </div>

        {/* Список статей */}
        {published.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-sm">No articles published yet.</p>
            <Link
              to="/notion"
              className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors mt-2 inline-block"
            >
              Go publish something ↗
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {published.map((card) => (
              <ArticleMain key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
