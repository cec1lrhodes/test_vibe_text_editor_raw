import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/react";
import {
  fetchCards,
  fetchArticles,
  createCard,
  updateCard,
  deleteCard,
  publishCard,
  unpublishCard,
} from "@/api/cardsApi";

export const CARDS_KEY = ["cards"] as const;
export const ARTICLES_KEY = ["articles"] as const;

export const useCardsQuery = () =>
  useQuery({ queryKey: CARDS_KEY, queryFn: fetchCards });

export const useArticlesQuery = () =>
  useQuery({ queryKey: ARTICLES_KEY, queryFn: fetchArticles });

export const useAddCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      content: JSONContent;
      plainText: string;
      backgroundImage?: string;
    }) => createCard(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: CARDS_KEY }),
  });
};

export const useUpdateCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      content,
      plainText,
      backgroundImage,
    }: {
      id: string;
      content: JSONContent;
      plainText: string;
      backgroundImage?: string;
    }) => updateCard(id, { content, plainText, backgroundImage }),
    onSuccess: () => qc.invalidateQueries({ queryKey: CARDS_KEY }),
  });
};

export const useDeleteCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCard(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: CARDS_KEY }),
  });
};

export const usePublishCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      publishCard(id, title),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CARDS_KEY });
      qc.invalidateQueries({ queryKey: ARTICLES_KEY });
    },
  });
};

export const useUnpublishCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unpublishCard(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CARDS_KEY });
      qc.invalidateQueries({ queryKey: ARTICLES_KEY });
    },
  });
};
