import {
  INITIAL_STATE,
  setRefreshing,
  storeNewsList,
  storeMoreNewsList
} from '../NewsRedux'

describe('NewsRedux', () => {
  it('should set refreshing to false', () => {
    const action = { refreshing: false }
    const expectedState = setRefreshing(INITIAL_STATE, action)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      refreshing: false
    })
  })

  it('should set refreshing to true', () => {
    const action = { refreshing: true }
    const expectedState = setRefreshing(INITIAL_STATE, action)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      refreshing: true
    })
  })

  const storeNewsListAction = {
    keyword: 'bitcoin',
    newsList: [{
      id: 'ID_1',
      title: 'Title 1',
      desc: 'Description 1'
    }, {
      id: 'ID_2',
      title: 'Title 2',
      desc: 'Description 2'
    }]
  }

  it('should set the page back to 1', () => {
    const theInitialState = { ...INITIAL_STATE, page: 5 }
    const expectedState = storeNewsList(theInitialState, storeNewsListAction)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      page: 1,
      newsList: storeNewsListAction.articles,
      keyword: storeNewsListAction.keyword
    })
  })

  it('should replace keyword to given keyword', () => {
    const theInitialState = { ...INITIAL_STATE, keyword: 'to be replaced' }
    const expectedState = storeNewsList(theInitialState, storeNewsListAction)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      page: 1,
      newsList: storeNewsListAction.articles,
      keyword: storeNewsListAction.keyword
    })
  })

  it('should replace newsList to given articles', () => {
    const theInitialState = {
      ...INITIAL_STATE,
      newsList: [{
        id: 'ID_1',
        title: 'Title 1',
        desc: 'Description 1'
      }, {
        id: 'ID_2',
        title: 'Title 2',
        desc: 'Description 2'
      }, {
        id: 'ID_3',
        title: 'Title 3',
        desc: 'Description 3'
      }, {
        id: 'ID_4',
        title: 'Title 4',
        desc: 'Description 4'
      }, {
        id: 'ID_5',
        title: 'Title 5',
        desc: 'Description 5'
      }]
    }
    const expectedState = storeNewsList(theInitialState, storeNewsListAction)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      page: 1,
      newsList: storeNewsListAction.articles,
      keyword: storeNewsListAction.keyword
    })
  })

  const storeMoreNewsListAction = {
    fetchedPage: 5,
    articles: [{
      id: 'ID_11',
      title: 'Title 11',
      desc: 'Description 11'
    }, {
      id: 'ID_12',
      title: 'Title 12',
      desc: 'Description 12'
    }]
  }

  it('should set page to given fetchedPage', () => {
    const theInitialState = { ...INITIAL_STATE, page: 1 }
    const expectedState = storeMoreNewsList(theInitialState, storeMoreNewsListAction)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      page: storeMoreNewsListAction.fetchedPage,
      newsList: theInitialState.newsList.concat(storeMoreNewsListAction.articles)
    })
  })

  it('should concat given articles with existing newsList', () => {
    const theInitialState = {
      ...INITIAL_STATE,
      newsList: [{
        id: 'ID_1',
        title: 'Title 1',
        desc: 'Description 1'
      }, {
        id: 'ID_2',
        title: 'Title 2',
        desc: 'Description 2'
      }]
    }
    const expectedState = storeMoreNewsList(theInitialState, storeMoreNewsListAction)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      page: storeMoreNewsListAction.fetchedPage,
      newsList: theInitialState.newsList.concat(storeMoreNewsListAction.articles)
    })
  })
})
