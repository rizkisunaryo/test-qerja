import { combineReducers } from 'redux'

import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavRedux').reducer,
    news: require('./NewsRedux').reducer,
    window: require('./WindowRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
