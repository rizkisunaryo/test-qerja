import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doTest: ['data'],
  testReducer: ['data1', 'data2'],
  doApi: null,
  storeTestList: ['resp']
}, {})

export const TestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  testData1: null,
  testData2: null,
  testList: null
})

/* ------------- Reducers ------------- */

export const testReducer = (state, action) => {
  return state.merge({ testData1: action.data1, testData2: action.data2 })
}

export const storeTestList = (state, action) => {
  return state.merge({ testList: action.resp })
}

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.TEST_REDUCER]: testReducer,
  [Types.STORE_TEST_LIST]: storeTestList
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
