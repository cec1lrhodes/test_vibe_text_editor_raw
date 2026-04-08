export type CardId = string

export interface Card {
  id: CardId
  content: unknown // Tiptap JSONContent
  plainText: string
  backgroundImage?: string
  createdAt: number
  isPublished: boolean
  publishedTitle?: string
}

export interface CreateCardDto {
  content: unknown
  plainText: string
  backgroundImage?: string
}

export interface UpdateCardDto {
  content: unknown
  plainText: string
  backgroundImage?: string
}

export interface PublishCardDto {
  title: string
}
