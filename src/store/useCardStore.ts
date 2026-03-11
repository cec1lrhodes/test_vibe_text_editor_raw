import { create } from "zustand";
import type { JSONContent } from "@tiptap/react";
import type { Card, CardId, CardState } from "../components/Types/typeTiptap";

interface CardStore {
  // --- Дані карток ---
  cards: Card[];
  addCard: (
    content: JSONContent,
    plainText: string,
    backgroundImage?: string,
  ) => void;
  deleteCard: (id: CardId) => void;
  updateCard: (id: CardId, content: JSONContent, plainText: string) => void;

  // --- UI стан карток ---
  uiStates: Record<CardId, CardState>;
  setCardState: (id: CardId, state: CardState) => void;
  getCardState: (id: CardId) => CardState;
}

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  uiStates: {},
  addCard: (content, plainText, backgroundImage) => {
    const newCard: Card = {
      id: crypto.randomUUID(),
      content,
      plainText,
      backgroundImage,
      createdAt: Date.now(),
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

  setCardState: (id, state) => {
    set((prev) => ({
      uiStates: { ...prev.uiStates, [id]: state },
    }));
  },

  getCardState: (id) => {
    return get().uiStates[id] ?? "collapsed";
  },
}));
