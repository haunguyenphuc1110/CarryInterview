import { createSlice } from '@reduxjs/toolkit'
import { Book, BookVerse } from 'models/Book'

export type BookVerseState = {
  isLoading: boolean
  isSuccess: boolean
  error: any
  book: BookVerse | null
  bookHighlight: Book[]
}

const initialBookVerseState: BookVerseState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  book: null,
  bookHighlight: [],
}

const verseSlice = createSlice({
  name: 'bookVerse',
  initialState: initialBookVerseState,
  reducers: {
    startFetch: state => {
      state.isLoading = true
      state.isSuccess = false
      state.error = null
      state.book = null
      state.bookHighlight = []
    },
    getBookVerseSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.book = action.payload
      state.error = null
    },
    saveHighlightVerse: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.bookHighlight = action.payload
      state.error = null
    },
    fetchFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
      state.book = null
      state.bookHighlight = []
    },
  },
})

export const {
  startFetch,
  getBookVerseSuccess,
  saveHighlightVerse,
  fetchFail,
} = verseSlice.actions

export default verseSlice.reducer
