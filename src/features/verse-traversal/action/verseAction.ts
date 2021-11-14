import { createAction } from '@reduxjs/toolkit'
import { BookVerseParams } from 'models/Book'
import ACTION_TYPES from 'store/actionTypes'

export const getBookVerse = createAction<BookVerseParams>(
  ACTION_TYPES.BOOK_VERSE,
)
