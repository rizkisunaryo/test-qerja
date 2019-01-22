import { all, takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { NewsTypes } from '../Redux/NewsRedux'

/* ------------- Sagas ------------- */

import { fetchNews, fetchMoreNews, refreshNews } from './NewsSagas'

/* ------------- API ------------- */

// You can use DebugConfig.useFixtures to use fixtures or actual API

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(NewsTypes.FETCH_NEWS, fetchNews),
    takeLatest(NewsTypes.FETCH_MORE_NEWS, fetchMoreNews),
    takeLatest(NewsTypes.REFRESH_NEWS, refreshNews)
  ])
}
