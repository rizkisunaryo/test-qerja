import { runSaga } from 'redux-saga'
import { doTest } from './TestSagas'

describe('doTest', () => {
  it('should call create an action TEST_REDUCER with correct payload', async () => {
    const dispatched = []

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, doTest, { data: 'data 1' }).done

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, doTest, { data: 'data 3' }).done

    expect(dispatched).toEqual([{
      type: 'TEST_REDUCER',
      data1: 'data 1',
      data2: 'data 2'
    }, {
      type: 'TEST_REDUCER',
      data1: 'data 3',
      data2: 'data 2'
    }])
  })
})
