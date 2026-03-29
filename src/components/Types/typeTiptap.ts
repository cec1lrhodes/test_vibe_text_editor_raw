import type { JSONContent } from "@tiptap/react";

export type CardId = string;

export interface Card {
  id: CardId;
  content: JSONContent; // Повний Tiptap JSON — для expanded/full view
  plainText: string; // Чистий текст — для collapsed картки
  backgroundImage?: string; // Фонове фото картки
  createdAt: number;
  isPublished: boolean;
  publishedTitle?: string;
}

export type CardState = "collapsed" | "expanded" | "full"
