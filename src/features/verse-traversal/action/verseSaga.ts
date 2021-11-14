import { takeEvery } from 'redux-saga/effects'

import { getVerse } from './verseAction'

function* getVerseSaga(): any {}

export default function* verseSagas() {
  yield takeEvery(getVerse.toString(), getVerseSaga)
}
