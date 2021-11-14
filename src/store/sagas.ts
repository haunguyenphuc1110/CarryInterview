import { all } from 'redux-saga/effects'

import verseSaga from '../features/verse-traversal/action/verseSaga'

function* rootSaga() {
  yield all([verseSaga()])
}

export default rootSaga
