import { all, takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { TestTypes } from '../Redux/TestRedux'

/* ------------- Sagas ------------- */

import { doTest, doApi } from './TestSagas'

/* ------------- API ------------- */

// You can use DebugConfig.useFixtures to use fixtures or actual API

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(TestTypes.DO_TEST, doTest),
    takeLatest(TestTypes.DO_API, doApi)
  ])
}
