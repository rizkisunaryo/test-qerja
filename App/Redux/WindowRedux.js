import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setWindowLoading: ['loading']
}, {})

export const WindowTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  windowLoading: false
}

/* ------------- Reducers ------------- */

export const setWindowLoading = (state, action) => {
  return {
    ...state,
    windowLoading: action.loading
  }
}

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.SET_WINDOW_LOADING]: setWindowLoading
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
