import { useRef, useState } from "react";
import type { JSONContent } from "@tiptap/react";
import { RichTextEditor } from "../TextEditor/RichTextEditor";
import { useCardStore } from "../../store/useCardStore";

export const InputBar = () => {
  const addCard = useCardStore((s) => s.addCard);

  const [json, setJson] = useState<JSONContent | null>(null);
  const [plainText, setPlainText] = useState("");
  const [bgImage, setBgImage] = useState<string | undefined>(undefined);
  const [editorKey, setEditorKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEmpty = plainText.trim().length === 0;

  const handleEditorChange = (newJson: JSONContent, newPlainText: string) => {
    setJson(newJson);
    setPlainText(newPlainText);
  };

  const handleBgImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBgImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBg = () => {
    setBgImage(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!json || isEmpty) return;
    addCard(json, plainText, bgImage);
    // Скидаємо стан
    setJson(null);
    setPlainText("");
    setBgImage(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    // Перемонтуємо редактор щоб очистити вміст
    setEditorKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <RichTextEditor key={editorKey} onChange={handleEditorChange} />

      <div className="flex items-center gap-3">
        {/* Кнопка фонового фото */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Додати фонове фото"
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-all duration-200 shrink-0"
        >
          +
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBgImageSelect}
        />

        {/* Прев'ю фону */}
        {bgImage ? (
          <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0 border border-zinc-700">
            <img
              src={bgImage}
              alt="bg preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveBg}
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity text-white text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <span className="text-zinc-600 text-xs">No background</span>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Кнопка сабміту */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isEmpty}
          className="h-10 px-5 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-medium
            hover:bg-zinc-700 hover:text-zinc-100
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 active:scale-95 shrink-0"
        >
          ↑ Save
        </button>
      </div>
    </div>
  );
};
