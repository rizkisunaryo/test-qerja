import { INITIAL_STATE, testReducer, storeTestList } from './TestRedux'

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

  it('should test storeTestList', () => {
    const action = {
      resp: { data: 'dummy' }
    }
    const newState = storeTestList(INITIAL_STATE, action)
    expect(newState).toEqual({
      ...INITIAL_STATE,
      testList: { data: 'dummy' }
    })
  })
})
