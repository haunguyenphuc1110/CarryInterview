import {combineReducers} from 'redux'

import verseReducer from '../features/verse-traversal/action/verseReducer'

export default combineReducers({
  verse: verseReducer,
})
