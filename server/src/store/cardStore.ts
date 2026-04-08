import type { Card, CardId, CreateCardDto, UpdateCardDto } from "../types/card"
import { randomUUID } from "crypto"

const store = new Map<CardId, Card>()

const getAll = (): Card[] => Array.from(store.values())

const getById = (id: CardId): Card | undefined => store.get(id)

const create = (dto: CreateCardDto): Card => {
  const card: Card = {
    id: randomUUID(),
    content: dto.content,
    plainText: dto.plainText,
    backgroundImage: dto.backgroundImage,
    createdAt: Date.now(),
    isPublished: false,
    publishedTitle: undefined,
  }
  store.set(card.id, card)
  return card
}

const update = (id: CardId, dto: UpdateCardDto): Card | null => {
  const existing = store.get(id)
  if (!existing) return null

  const updated: Card = {
    ...existing,
    content: dto.content,
    plainText: dto.plainText,
    backgroundImage: dto.backgroundImage,
  }
  store.set(id, updated)
  return updated
}

const remove = (id: CardId): boolean => store.delete(id)

const publish = (id: CardId, title: string): Card | null => {
  const existing = store.get(id)
  if (!existing) return null

  const updated: Card = { ...existing, isPublished: true, publishedTitle: title }
  store.set(id, updated)
  return updated
}

const unpublish = (id: CardId): Card | null => {
  const existing = store.get(id)
  if (!existing) return null

  const updated: Card = { ...existing, isPublished: false, publishedTitle: undefined }
  store.set(id, updated)
  return updated
}

const getAllPublished = (): Card[] => getAll().filter((c) => c.isPublished)

export const cardStore = {
  getAll,
  getById,
  create,
  update,
  remove,
  publish,
  unpublish,
  getAllPublished,
}
