import { create } from "zustand";
import type { CardId, CardState } from "../components/Types/typeTiptap";

interface CardUIStore {
  editingId: CardId | null;
  startEditing: (id: CardId) => void;
  stopEditing: () => void;

  uiStates: Record<CardId, CardState>;
  setCardState: (id: CardId, state: CardState) => void;
  getCardState: (id: CardId) => CardState;
}

export const useCardStore = create<CardUIStore>()((set, get) => ({
  editingId: null,
  uiStates: {},

  startEditing: (id) => set({ editingId: id }),
  stopEditing: () => set({ editingId: null }),

  setCardState: (id, state) => {
    set((prev) => ({ uiStates: { ...prev.uiStates, [id]: state } }));
  },

  getCardState: (id) => get().uiStates[id] ?? "collapsed",
}));
