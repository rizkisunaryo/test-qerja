import {
  INITIAL_STATE,
  setWindowLoading
} from '../WindowRedux'

describe('WindowRedux', () => {
  it('should set windowLoading to false', () => {
    const action = { loading: false }
    const expectedState = setWindowLoading(INITIAL_STATE, action)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      windowLoading: false
    })
  })

  it('should set windowLoading to true', () => {
    const action = { loading: true }
    const expectedState = setWindowLoading(INITIAL_STATE, action)
    expect(expectedState).toEqual({
      ...INITIAL_STATE,
      windowLoading: true
    })
  })
})
