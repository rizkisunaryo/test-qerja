import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doTest: ['data'],
  testReducer: ['data1', 'data2']
}, {})

export const TestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  testData1: null,
  testData2: null
})

/* ------------- Reducers ------------- */

const testReducer = (state, action) => {
  return state.merge({ testData1: action.data1, testData2: action.data2 })
}

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.TEST_REDUCER]: testReducer
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
