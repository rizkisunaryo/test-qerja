import { INITIAL_STATE, testReducer } from './TestRedux'

describe('TestRedux', () => {
  it('should test testReducer', () => {
    const action = {
      data1: 'test 1',
      data2: 'test 2'
    }
    const newState = testReducer(INITIAL_STATE, action)
    expect(newState).toEqual({
      ...INITIAL_STATE,
      testData1: 'test 1',
      testData2: 'test 2'
    })
  })
})
