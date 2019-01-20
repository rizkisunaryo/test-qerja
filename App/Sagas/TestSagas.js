import { call, put } from 'redux-saga/effects'

import TestCreators from '../Redux/TestRedux'
import { apiGetTodoList } from '../Services/Api'

export function * doTest (action) {
  yield put(TestCreators.testReducer(action.data, 'data 2'))
}

export function * doApi () {
  const resp = yield call(apiGetTodoList)
  yield put(TestCreators.storeTestList(resp))
}
