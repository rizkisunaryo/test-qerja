import { combineReducers } from 'redux'

import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    test: require('./TestRedux').reducer,
    nav: require('./NavRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
