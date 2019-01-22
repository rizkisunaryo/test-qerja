import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'

import NewsCreators from '../Redux/NewsRedux'
import WindowCreators from '../Redux/WindowRedux'
import { apiGetNewsList } from '../Services/Api'

const getKeyword = keyword => keyword && keyword.trim() !== '' ? keyword : 'test'

function * ifOkThenStoreNewsList (resp, keyword) {
  if (_.get(resp, 'status', '').trim() === 'ok' &&
    _.get(resp, 'articles', []).length > 0) {
    yield put(NewsCreators.storeNewsList(keyword, resp.articles))
  }
}

function isNotOk (resp) {
  return (_.get(resp, 'status', '').trim() !== 'ok' ||
    _.get(resp, 'articles', []).length <= 0)
}

export function * fetchNews (action) {
  yield put(WindowCreators.setWindowLoading(true))

  const keyword = getKeyword(action.keyword)
  const resp = yield call(apiGetNewsList, keyword)
  yield call(ifOkThenStoreNewsList, resp, keyword)

  yield put(WindowCreators.setWindowLoading(false))
}

export function * fetchMoreNews () {
  const keyword = getKeyword(yield select(state => state.news.keyword))
  const nextPage = (yield select(state => state.news.page)) + 1

  const resp = yield call(apiGetNewsList, keyword, nextPage)
  if (isNotOk(resp)) return

  yield put(NewsCreators.storeMoreNewsList(nextPage, resp.articles))
}

export function * refreshNews () {
  yield put(NewsCreators.setRefreshing(true))

  const keyword = getKeyword(yield select(state => state.news.keyword))
  const resp = yield call(apiGetNewsList, keyword)
  yield call(ifOkThenStoreNewsList, resp, keyword)

  yield put(NewsCreators.setRefreshing(false))
}
