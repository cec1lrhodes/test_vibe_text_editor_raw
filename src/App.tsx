import { CardsGrid } from "./components/Card/CardGrid";
import { InputBar } from "./components/InputBar/InputBar";
import { Link } from "@tanstack/react-router";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-zinc-400 text-sm uppercase tracking-widest">
            Rich Text Editor
          </h1>
          <Link
            to="/articles"
            className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            to ArticlePage →
          </Link>
        </div>
        <InputBar />
        <CardsGrid />
      </div>
    </div>
  );
}

export default App;
