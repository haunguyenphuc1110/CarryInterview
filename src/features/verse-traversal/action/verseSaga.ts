import { call, put, takeEvery } from 'redux-saga/effects'

import { getBookVerse } from './verseAction'
import { startFetch, getBookVerseSuccess, fetchFail } from './verseReducer'

import ApiServices from 'Services/api/calls'
import { ITask, TaskAction } from 'models/Api'
import { BookVerseParams } from 'models/Book'

function* getBookVerseSaga({ payload }: ITask<BookVerseParams>): any {
  try {
    yield put(startFetch())
    const response = yield call([ApiServices, 'getBookVerse'], payload)
    yield put(getBookVerseSuccess(response.data))
  } catch (e: any) {
    yield put(fetchFail(e.message))
  }
}

export default function* verseSagas() {
  yield takeEvery<TaskAction<BookVerseParams>>(
    getBookVerse.toString(),
    getBookVerseSaga,
  )
}
