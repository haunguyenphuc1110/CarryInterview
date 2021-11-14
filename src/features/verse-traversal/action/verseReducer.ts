import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  isLoading: false,
  isSuccess: false,
  error: null,
  config: null,
  info: null,
}

const verseSlice = createSlice({
  name: 'verse',
  initialState,
  reducers: {
    startFetch: state => {
      state.isLoading = true
      state.isSuccess = false
      state.error = null
    },
    getVerseSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.verse = action.payload
      state.error = null
    },
    fetchFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
      state.config = null
      state.info = null
    },
  },
})

export const { startFetch, getVerseSuccess, fetchFail } = verseSlice.actions

export default verseSlice.reducer
