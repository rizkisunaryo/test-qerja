import { runSaga } from 'redux-saga'
import sinon from 'sinon'

import * as Api from '../../Services/Api'
import { fetchNews, fetchMoreNews, refreshNews } from '../NewsSagas'

describe('NewsSagas', () => {
  describe('fetchNews', () => {
    it('should pass normal scenario', async () => {
      const fakeResp = {
        status: 'ok',
        articles: [{
          id: 'ID_1',
          title: 'Title 1',
          desc: 'Description 1'
        }, {
          id: 'ID_2',
          title: 'Title 2',
          desc: 'Description 2'
        }]
      }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const sagaAction = { keyword: 'bitcoin' }
      await runSaga({
        dispatch: (action) => dispatched.push(action)
      }, fetchNews, sagaAction).done

      expect(dispatched).toEqual([{
        type: 'SET_WINDOW_LOADING',
        loading: true
      }, {
        type: 'STORE_NEWS_LIST',
        keyword: sagaAction.keyword,
        articles: fakeResp.articles
      }, {
        type: 'SET_WINDOW_LOADING',
        loading: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should not storeNewsList if no status', async () => {
      const fakeResp = {}
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const sagaAction = { keyword: 'bitcoin' }
      await runSaga({
        dispatch: (action) => dispatched.push(action)
      }, fetchNews, sagaAction).done

      expect(dispatched).toEqual([{
        type: 'SET_WINDOW_LOADING',
        loading: true
      }, {
        type: 'SET_WINDOW_LOADING',
        loading: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should not storeNewsList if status is not ok', async () => {
      const fakeResp = { status: 'im_not_ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const sagaAction = { keyword: 'bitcoin' }
      await runSaga({
        dispatch: (action) => dispatched.push(action)
      }, fetchNews, sagaAction).done

      expect(dispatched).toEqual([{
        type: 'SET_WINDOW_LOADING',
        loading: true
      }, {
        type: 'SET_WINDOW_LOADING',
        loading: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should not storeNewsList if status ok, but no articles', async () => {
      const fakeResp = { status: 'ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const sagaAction = { keyword: 'bitcoin' }
      await runSaga({
        dispatch: (action) => dispatched.push(action)
      }, fetchNews, sagaAction).done

      expect(dispatched).toEqual([{
        type: 'SET_WINDOW_LOADING',
        loading: true
      }, {
        type: 'SET_WINDOW_LOADING',
        loading: false
      }])

      Api.apiGetNewsList.restore()
    })
  })

  describe('fetchMoreNews', () => {
    it('should pass normal scenario', async () => {
      const fakeResp = {
        status: 'ok',
        articles: [{
          id: 'ID_1',
          title: 'Title 1',
          desc: 'Description 1'
        }, {
          id: 'ID_2',
          title: 'Title 2',
          desc: 'Description 2'
        }]
      }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = {
        news: {
          keyword: 'bitcoin',
          page: 2
        }
      }
      await runSaga(fetchMoreNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([{
        type: 'STORE_MORE_NEWS_LIST',
        fetchedPage: state.news.page + 1,
        articles: fakeResp.articles
      }])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if no status', async () => {
      const fakeResp = {}
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = {
        news: {
          keyword: 'bitcoin',
          page: 2
        }
      }
      await runSaga(fetchMoreNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if status is not ok', async () => {
      const fakeResp = { status: 'im_not_ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = {
        news: {
          keyword: 'bitcoin',
          page: 2
        }
      }
      await runSaga(fetchMoreNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if status ok, but no articles', async () => {
      const fakeResp = { status: 'ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = {
        news: {
          keyword: 'bitcoin',
          page: 2
        }
      }
      await runSaga(fetchMoreNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([])

      Api.apiGetNewsList.restore()
    })
  })

  describe('refreshNews', () => {
    it('should pass normal scenario', async () => {
      const fakeResp = {
        status: 'ok',
        articles: [{
          id: 'ID_1',
          title: 'Title 1',
          desc: 'Description 1'
        }, {
          id: 'ID_2',
          title: 'Title 2',
          desc: 'Description 2'
        }]
      }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = { news: { keyword: 'bitcoin' } }
      await runSaga(refreshNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([{
        type: 'SET_REFRESHING',
        refreshing: true
      }, {
        type: 'STORE_NEWS_LIST',
        keyword: state.news.keyword,
        articles: fakeResp.articles
      }, {
        type: 'SET_REFRESHING',
        refreshing: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if no status', async () => {
      const fakeResp = {}
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = { news: { keyword: 'bitcoin' } }
      await runSaga(refreshNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([{
        type: 'SET_REFRESHING',
        refreshing: true
      }, {
        type: 'SET_REFRESHING',
        refreshing: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if status is not ok', async () => {
      const fakeResp = { status: 'im_not_ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = { news: { keyword: 'bitcoin' } }
      await runSaga(refreshNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([{
        type: 'SET_REFRESHING',
        refreshing: true
      }, {
        type: 'SET_REFRESHING',
        refreshing: false
      }])

      Api.apiGetNewsList.restore()
    })

    it('should do nothing if status ok, but no articles', async () => {
      const fakeResp = { status: 'ok' }
      sinon.stub(Api, 'apiGetNewsList').callsFake(() => fakeResp)

      const dispatched = []

      const state = { news: { keyword: 'bitcoin' } }
      await runSaga(refreshNews(), {
        dispatch: (action) => dispatched.push(action),
        getState: () => state
      }).done

      expect(dispatched).toEqual([{
        type: 'SET_REFRESHING',
        refreshing: true
      }, {
        type: 'SET_REFRESHING',
        refreshing: false
      }])

      Api.apiGetNewsList.restore()
    })
  })
})
