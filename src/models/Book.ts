export type Book = {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

export type BookVerse = {
  reference: string
  verses: Book[]
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
}

export type BookVerseParams = {
  name: string
  chapters: number
}
