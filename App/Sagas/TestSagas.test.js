import { runSaga } from 'redux-saga'
import sinon from 'sinon'

import { doApi, doTest } from './TestSagas'
import * as Api from '../Services/Api'

describe('doTest', () => {
  it('should create an action TEST_REDUCER with correct payload', async () => {
    const dispatched = []

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, doTest, { data: 'data 1' }).done

    expect(dispatched).toEqual([{
      type: 'TEST_REDUCER',
      data1: 'data 1',
      data2: 'data 2'
    }])
  })
})

describe('doApi', () => {
  it('should create an action STORE_TEST_LIST with correct payload', async () => {
    sinon.stub(Api, 'apiGetTodoList').callsFake(() => ({ some: 'value' }))

    const dispatched = []
    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, doApi).done

    expect(dispatched).toEqual([{
      type: 'STORE_TEST_LIST',
      resp: {
        some: 'value'
      }
    }])
  })
})
