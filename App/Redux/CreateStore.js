import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import { navigationMiddleware } from '../Navigation/AppNavigation'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [thunk, navigationMiddleware]
  if (__DEV__) {
    middleware.push(logger)
  }
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createAppropriateStore(persistedReducer, compose(...enhancers))

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor: persistStore(store) }
}
