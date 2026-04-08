import type { Card } from "@/components/Types/typeTiptap";
import type { JSONContent } from "@tiptap/react";

const BASE = "http://localhost:3001/api";

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
};

export interface CreateCardPayload {
  content: JSONContent;
  plainText: string;
  backgroundImage?: string;
}

export interface UpdateCardPayload {
  content: JSONContent;
  plainText: string;
  backgroundImage?: string;
}

export const fetchCards = (): Promise<Card[]> =>
  fetch(`${BASE}/cards`).then((r) => handleResponse<Card[]>(r));

export const fetchCard = (id: string): Promise<Card> =>
  fetch(`${BASE}/cards/${id}`).then((r) => handleResponse<Card>(r));

export const createCard = (payload: CreateCardPayload): Promise<Card> =>
  fetch(`${BASE}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => handleResponse<Card>(r));

export const updateCard = (
  id: string,
  payload: UpdateCardPayload,
): Promise<Card> =>
  fetch(`${BASE}/cards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => handleResponse<Card>(r));

export const deleteCard = (id: string): Promise<void> =>
  fetch(`${BASE}/cards/${id}`, { method: "DELETE" }).then((r) =>
    handleResponse<void>(r),
  );

export const publishCard = (id: string, title: string): Promise<Card> =>
  fetch(`${BASE}/cards/${id}/publish`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((r) => handleResponse<Card>(r));

export const unpublishCard = (id: string): Promise<Card> =>
  fetch(`${BASE}/cards/${id}/unpublish`, { method: "PATCH" }).then((r) =>
    handleResponse<Card>(r),
  );

export const fetchArticles = (): Promise<Card[]> =>
  fetch(`${BASE}/articles`).then((r) => handleResponse<Card[]>(r));
