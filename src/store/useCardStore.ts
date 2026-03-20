import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JSONContent } from "@tiptap/react";
import type { Card, CardId, CardState } from "../components/Types/typeTiptap";

interface CardStore {
  //  Дані карток
  cards: Card[];
  isPublished: boolean;
  publishedTitle?: string;
  addCard: (
    content: JSONContent,
    plainText: string,
    backgroundImage?: string,
  ) => void;
  deleteCard: (id: CardId) => void;
  updateCard: (id: CardId, content: JSONContent, plainText: string) => void;

  editingId: CardId | null;
  startEditing: (id: CardId) => void;
  stopEditing: () => void;

  //  UI стан карток
  uiStates: Record<CardId, CardState>;
  setCardState: (id: CardId, state: CardState) => void;
  getCardState: (id: CardId) => CardState;

  publishCard: (id: CardId, title: string) => void;
  unpublishCard: (id: CardId) => void;
}

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      isPublished: false,

      cards: [],
      editingId: null,
      uiStates: {},

      addCard: (content, plainText, backgroundImage) => {
        const newCard: Card = {
          id: crypto.randomUUID(),
          content,
          plainText,
          backgroundImage,
          createdAt: Date.now(),
          isPublished: false,
          publishedTitle: undefined,
        };
        set((state) => ({ cards: [...state.cards, newCard] }));
      },

      deleteCard: (id) => {
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id),
          uiStates: Object.fromEntries(
            Object.entries(state.uiStates).filter(([key]) => key !== id),
          ),
        }));
      },

      updateCard: (id, content, plainText) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, content, plainText } : c,
          ),
        }));
      },

      startEditing: (id) => set({ editingId: id }),
      stopEditing: () => set({ editingId: null }),

      setCardState: (id, state) => {
        set((prev) => ({
          uiStates: { ...prev.uiStates, [id]: state },
        }));
      },

      getCardState: (id) => {
        return get().uiStates[id] ?? "collapsed";
      },

      publishCard: (id, title) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id
              ? { ...c, isPublished: true, publishedTitle: title }
              : c,
          ),
        }));
      },

      unpublishCard: (id) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id
              ? { ...c, isPublished: false, publishedTitle: undefined }
              : c,
          ),
        }));
      },
    }),
    {
      name: "notion-cards",
      partialize: (state) => ({
        cards: state.cards,
      }),
    },
  ),
);
