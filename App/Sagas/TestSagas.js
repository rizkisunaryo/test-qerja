import { put } from 'redux-saga/effects'

import TestCreators from '../Redux/TestRedux'

export function * doTest (action) {
  yield put(TestCreators.testReducer(action.data, 'data 2'))
}
