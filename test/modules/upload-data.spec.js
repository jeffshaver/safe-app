/* globals afterEach, describe, it */

import {apiUri} from '../../config.js'
import configureStore from 'redux-mock-store'
import expect from 'expect'
import nock from 'nock'
import thunk from 'redux-thunk'
import {
  createExistingSourceDataUploadFailure,
  createExistingSourceDataUploadRequest,
  createExistingSourceDataUploadSuccess,
  createNewSourceDataUploadFailure,
  createNewSourceDataUploadRequest,
  createNewSourceDataUploadSuccess,
  FAILURE_EXIST,
  FAILURE_NEW,
  default as reducer,
  REQUEST_EXIST,
  REQUEST_NEW,
  RESET_EXIST,
  RESET_NEW,
  resetExistingUploadData,
  resetNewUploadData,
  sendExistingSourceData,
  sendNewSourceData,
  SET_EXISTING_SOURCE_DATA,
  SET_NEW_SOURCE_DATA,
  setExistingSourceData,
  setNewSourceData,
  SUCCESS_EXIST,
  SUCCESS_NEW
} from '../../src/js/modules/upload-data'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('uploadData actions', () => {
  describe('sync actions', () => {
    it('createExistingSourceDataUploadFailure should create a FAILURE_EXIST action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE_EXIST
      }

      expect(createExistingSourceDataUploadFailure(error)).toEqual(expectedAction)
    })
    it('createNewSourceDataUploadFailure should create a FAILURE_NEW action', () => {
      const error = new Error('test error')
      const expectedAction = {
        payload: {error},
        type: FAILURE_NEW
      }

      expect(createNewSourceDataUploadFailure(error)).toEqual(expectedAction)
    })

    it('createExistingSourceDataUploadRequest should create a REQUEST_EXIST action', () => {
      const expectedAction = {
        type: REQUEST_EXIST
      }

      expect(createExistingSourceDataUploadRequest()).toEqual(expectedAction)
    })
    it('createNewSourceDataUploadRequest should create a REQUEST_NEW action', () => {
      const expectedAction = {
        type: REQUEST_NEW
      }

      expect(createNewSourceDataUploadRequest()).toEqual(expectedAction)
    })

    it('createExistingSourceDataUploadSuccess should create a SUCCESS_EXIST action', () => {
      const expectedAction = {
        payload: {data: {}},
        recievedAt: null,
        type: SUCCESS_EXIST
      }
      const action = createExistingSourceDataUploadSuccess({})

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })
    it('createNewSourceDataUploadSuccess should create a SUCCESS_NEW action', () => {
      const expectedAction = {
        payload: {data: {}},
        recievedAt: null,
        type: SUCCESS_NEW
      }
      const action = createNewSourceDataUploadSuccess({})

      expectedAction.recievedAt = action.recievedAt

      expect(action).toEqual(expectedAction)
    })

    it('resetExistingUploadData should create a RESET_EXIST action', () => {
      const expectedAction = {
        type: RESET_EXIST
      }

      expect(resetExistingUploadData()).toEqual(expectedAction)
    })
    it('resetNewUploadData should create a RESET_NEW action', () => {
      const expectedAction = {
        type: RESET_NEW
      }

      expect(resetNewUploadData()).toEqual(expectedAction)
    })

    it('setExistingSourceData should create a SET_EXISTING_SOURCE_DATA action', () => {
      const expectedAction = {
        payload: {},
        type: SET_EXISTING_SOURCE_DATA
      }

      expect(setExistingSourceData({})).toEqual(expectedAction)
    })
    it('setNewSourceData should create a SET_NEW_SOURCE_DATA action', () => {
      const expectedAction = {
        payload: {},
        type: SET_NEW_SOURCE_DATA
      }

      expect(setNewSourceData({})).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('sendExistingSourceData creates a SUCCESS_EXIST action on success', (done) => {
      const sourceId = 'asdf1234'
      const successData = {source: {_id: sourceId}, upload: {success: true}}

      nock(apiUri)
        .post(`/sources/${sourceId}/data`)
        .reply(200, successData)

      const requestAction = {
        type: REQUEST_EXIST
      }
      const receiveAction = {
        type: SUCCESS_EXIST,
        payload: {
          data: successData
        },
        recievedAt: null
      }
      const store = mockStore({})

      store.dispatch(sendExistingSourceData(sourceId, {a: 1, b: 'str', c: false}))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            receiveAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('sendExistingSourceData creates a FAILURE_EXIST action on failure', (done) => {
      const sourceId = 'asdf1234'

      nock(apiUri)
        .post(`/sources/${sourceId}/data`)
        .reply(500)

      const error = new Error('NetworkError')
      const requestAction = {
        type: REQUEST_EXIST
      }
      const failureAction = {
        payload: {error},
        type: FAILURE_EXIST
      }
      const store = mockStore({})

      store.dispatch(sendExistingSourceData(sourceId, {a: 1, b: 'str', c: false}))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            failureAction
          ]

          expectedActions[1].payload.error = actions[1].payload.error

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('sendNewSourceData creates a SUCCESS_NEW action on success', (done) => {
      const sourceId = 'asdf1234'
      const successData = {source: {_id: sourceId}, upload: {success: true}}

      nock(apiUri)
        .post(`/sources/${sourceId}/data`)
        .reply(200, successData)

      const requestAction = {
        type: REQUEST_NEW
      }
      const receiveAction = {
        type: SUCCESS_NEW,
        payload: {
          data: successData
        },
        recievedAt: null
      }
      const store = mockStore({})

      store.dispatch(sendNewSourceData(sourceId, {a: 1, b: 'str', c: false}))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            receiveAction
          ]

          expectedActions[1].recievedAt = actions[1].recievedAt

          expect(actions).toEqual(expectedActions)
          done()
        })
    })

    it('sendNewSourceData creates a FAILURE_NEW action on failure', (done) => {
      const sourceId = 'asdf1234'

      nock(apiUri)
        .post(`/sources/${sourceId}/data`)
        .reply(500)

      const error = new Error('NetworkError')
      const requestAction = {
        type: REQUEST_NEW
      }
      const failureAction = {
        payload: {error},
        type: FAILURE_NEW
      }
      const store = mockStore({})

      store.dispatch(sendNewSourceData(sourceId, {a: 1, b: 'str', c: false}))
        .then(() => {
          const actions = store.getActions()
          const expectedActions = [
            requestAction,
            failureAction
          ]

          expectedActions[1].payload.error = actions[1].payload.error

          expect(actions).toEqual(expectedActions)
          done()
        })
    })
  })
})

describe('uploadData reducer', () => {
  const initialState = {
    dataExist: {},
    dataNew: {},
    errorExist: undefined,
    errorNew: undefined,
    existingSourceData: {},
    isFetchingExist: false,
    isFetchingNew: false,
    lastUpdatedExist: null,
    lastUpdatedNew: null,
    newSourceData: {}
  }

  it('should return the initial state', () => {
    const stateAfter = initialState

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle FAILURE_EXIST', () => {
    const error = new Error('test error')
    const action = {
      payload: {error},
      type: FAILURE_EXIST
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: error,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(reducer({...initialState, isFetchingExist: true}, action)).toEqual(stateAfter)
  })

  it('should handle FAILURE_NEW', () => {
    const error = new Error('test error')
    const action = {
      payload: {error},
      type: FAILURE_NEW
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: undefined,
      errorNew: error,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(reducer({...initialState, isFetchingNew: true}, action)).toEqual(stateAfter)
  })

  it('should handle REQUEST_EXIST', () => {
    const action = {
      type: REQUEST_EXIST
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: true,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(reducer({...initialState, errorExist: 'error'}, action)).toEqual(stateAfter)
  })

  it('should handle REQUEST_NEW', () => {
    const action = {
      type: REQUEST_NEW
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: true,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(reducer({...initialState, errorNew: 'error'}, action)).toEqual(stateAfter)
  })

  it('should handle RESET_EXIST', () => {
    const action = {
      type: RESET_EXIST
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {b: 2},
      errorExist: undefined,
      errorNew: 'errorN',
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: true,
      lastUpdatedExist: null,
      lastUpdatedNew: 23456,
      newSourceData: {d: 4}
    }
    const stateBefore = {
      dataExist: {a: 1},
      dataNew: {b: 2},
      errorExist: 'errorE',
      errorNew: 'errorN',
      existingSourceData: {c: 3},
      isFetchingExist: true,
      isFetchingNew: true,
      lastUpdatedExist: 12345,
      lastUpdatedNew: 23456,
      newSourceData: {d: 4}
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle RESET_NEW', () => {
    const action = {
      type: RESET_NEW
    }
    const stateAfter = {
      dataExist: {a: 1},
      dataNew: {},
      errorExist: 'errorE',
      errorNew: undefined,
      existingSourceData: {c: 3},
      isFetchingExist: true,
      isFetchingNew: false,
      lastUpdatedExist: 12345,
      lastUpdatedNew: null,
      newSourceData: {}
    }
    const stateBefore = {
      dataExist: {a: 1},
      dataNew: {b: 2},
      errorExist: 'errorE',
      errorNew: 'errorN',
      existingSourceData: {c: 3},
      isFetchingExist: true,
      isFetchingNew: true,
      lastUpdatedExist: 12345,
      lastUpdatedNew: 23456,
      newSourceData: {d: 4}
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle SET_EXISTING_SOURCE_DATA', () => {
    const data = {_id: 'abc123', name: 'Name'}
    const action = {
      payload: {data},
      type: SET_EXISTING_SOURCE_DATA
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {data},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })

  it('should handle SET_NEW_SOURCE_DATA', () => {
    const data = {_id: 'abc123', name: 'Name'}
    const action = {
      payload: {data},
      type: SET_NEW_SOURCE_DATA
    }
    const stateAfter = {
      dataExist: {},
      dataNew: {},
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: null,
      newSourceData: {data}
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })

  it('should handle SUCCESS_EXIST', () => {
    const data = {_id: 'abc123', name: 'Name'}
    const action = {
      payload: {data},
      recievedAt: Date.now(),
      type: SUCCESS_EXIST
    }
    const result = reducer({...initialState, errorExist: 'errorE', isFetchingExist: true}, action)
    const expectedValue = {
      dataExist: data,
      dataNew: {},
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: action.recievedAt,
      lastUpdatedNew: null,
      newSourceData: {}
    }

    expect(result).toEqual(expectedValue)
  })

  it('should handle SUCCESS_NEW', () => {
    const data = {_id: 'abc123', name: 'Name'}
    const action = {
      payload: {data},
      recievedAt: Date.now(),
      type: SUCCESS_NEW
    }
    const result = reducer({...initialState, errorNew: 'errorN', isFetchingNew: true}, action)
    const expectedValue = {
      dataExist: {},
      dataNew: data,
      errorExist: undefined,
      errorNew: undefined,
      existingSourceData: {},
      isFetchingExist: false,
      isFetchingNew: false,
      lastUpdatedExist: null,
      lastUpdatedNew: action.recievedAt,
      newSourceData: {}
    }

    expect(result).toEqual(expectedValue)
  })
})