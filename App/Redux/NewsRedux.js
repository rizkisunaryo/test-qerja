import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  emptyNewsList: null,
  fetchNews: ['keyword'],
  fetchMoreNews: null,
  refreshNews: null,
  setRefreshing: ['refreshing'],
  storeNewsList: ['keyword', 'articles'],
  storeMoreNewsList: ['fetchedPage', 'articles']
}, {})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  refreshing: false,
  keyword: '',
  page: 0,
  newsList: []
}

/* ------------- Reducers ------------- */

export const setRefreshing = (state, action) => {
  return {
    ...state,
    refreshing: action.refreshing
  }
}

export const storeNewsList = (state, action) => {
  return {
    ...state,
    page: 1,
    keyword: action.keyword,
    newsList: action.articles
  }
}

export const storeMoreNewsList = (state, action) => {
  return {
    ...state,
    page: action.fetchedPage,
    newsList: state.newsList.concat(action.articles)
  }
}

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.SET_REFRESHING]: setRefreshing,
  [Types.STORE_NEWS_LIST]: storeNewsList,
  [Types.STORE_MORE_NEWS_LIST]: storeMoreNewsList
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
