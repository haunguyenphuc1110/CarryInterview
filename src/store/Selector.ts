import { BookVerseState } from 'features/verse-traversal/action/verseReducer'

export type AppState = {
  bookVerse: BookVerseState
}

const mapSelectToState = {
  bookVerse: (state: AppState) => state.bookVerse,
}

const Selector = (state: AppState) => {
  const result = {}
  for (const key in mapSelectToState)
    if (mapSelectToState.hasOwnProperty(key)) {
      result[key] = () => mapSelectToState[key](state)
    }
  return result as {
    [S in keyof typeof mapSelectToState]: () => ReturnType<
      typeof mapSelectToState[S]
    >
  }
}

for (const key in mapSelectToState)
  if (mapSelectToState.hasOwnProperty(key)) {
    Selector[key] = mapSelectToState[key]
  }

export default Selector as typeof mapSelectToState & typeof Selector
