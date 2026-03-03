import { CardsGrid } from "./components/Card/CardGrid";
import { InputBar } from "./components/InputBar/InputBar";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-zinc-400 text-sm uppercase tracking-widest">
          Rich Text Editor
        </h1>

        <InputBar />

        <CardsGrid />
      </div>
    </div>
  );
}

export default App;
