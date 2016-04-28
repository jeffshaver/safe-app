/* globals describe, it */

import configureStore from 'redux-mock-store'
import expect from 'expect'
import thunk from 'redux-thunk'

import {
  clearNewSourceNameRequired,
  disableExistingSourceDataSubmit,
  disableNewSourceDataSubmit,
  disableNewSourceName,
  disableNewSourceNameSubmit,
  DO_NEW_SOURCE_SAVED,
  doNewSourceSaved,
  enableExistingSourceDataSubmit,
  enableNewSourceDataSubmit,
  enableNewSourceName,
  enableNewSourceNameSubmit,
  default as reducer,
  RESET_EXISTING_FORM,
  RESET_NEW_FORM,
  resetExistingFormAction,
  resetNewFormAction,
  SET_EXISTING_SOURCE_SELECTED,
  SET_NEW_SOURCE_ERROR_TEXT,
  SET_NEW_SOURCE_NAME,
  setExistingSourceSelected,
  setNewSourceErrorText,
  setNewSourceName,
  setNewSourceNameRequired,
  TOGGLE_ES_SUBMIT,
  TOGGLE_NS_DATA_SUBMIT,
  TOGGLE_NS_NAME,
  TOGGLE_NS_NAME_SUBMIT,
  toggleExistingSourceDataSubmit,
  toggleNewSourceDataSubmit,
  toggleNewSourceName,
  toggleNewSourceNameSubmit
} from '../../src/js/modules/uploads'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('uploads actions', () => {
  it('clearNewSourceNameRequired should create a SET_NEW_SOURCE_ERROR_TEXT action', () => {
    const expectedAction = {
      payload: '',
      type: SET_NEW_SOURCE_ERROR_TEXT
    }
    const store = mockStore({})

    store.dispatch(clearNewSourceNameRequired())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('disableExistingSourceDataSubmit should create a TOGGLE_ES_SUBMIT action', () => {
    const expectedAction = {
      payload: true,
      type: TOGGLE_ES_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(disableExistingSourceDataSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('disableNewSourceDataSubmit should create a TOGGLE_NS_DATA_SUBMIT action', () => {
    const expectedAction = {
      payload: true,
      type: TOGGLE_NS_DATA_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(disableNewSourceDataSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('disableNewSourceName should create a TOGGLE_NS_NAME action', () => {
    const expectedAction = {
      payload: true,
      type: TOGGLE_NS_NAME
    }
    const store = mockStore({})

    store.dispatch(disableNewSourceName())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('disableNewSourceNameSubmit should create a TOGGLE_NS_NAME_SUBMIT action', () => {
    const expectedAction = {
      payload: true,
      type: TOGGLE_NS_NAME_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(disableNewSourceNameSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('doNewSourceSaved should create a DO_NEW_SOURCE_SAVED action', () => {
    const expectedAction = {
      payload: true,
      type: DO_NEW_SOURCE_SAVED
    }
    
    expect(doNewSourceSaved(true)).toEqual(expectedAction)
  })
  it('enableExistingSourceDataSubmit should create a TOGGLE_ES_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_ES_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(enableExistingSourceDataSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('enableNewSourceDataSubmit should create a TOGGLE_NS_DATA_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_DATA_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(enableNewSourceDataSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('enableNewSourceName should create a TOGGLE_NS_NAME action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_NAME
    }
    const store = mockStore({})

    store.dispatch(enableNewSourceName())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('enableNewSourceNameSubmit should create a TOGGLE_NS_NAME_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_NAME_SUBMIT
    }
    const store = mockStore({})

    store.dispatch(enableNewSourceNameSubmit())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('resetExistingFormAction should create a RESET_EXISTING_FORM action', () => {
    const expectedAction = {
      type: RESET_EXISTING_FORM
    }
    
    expect(resetExistingFormAction()).toEqual(expectedAction)
  })
  it('resetNewFormAction should create a RESET_NEW_FORM action', () => {
    const expectedAction = {
      type: RESET_NEW_FORM
    }

    expect(resetNewFormAction()).toEqual(expectedAction)
  })
  it('setExistingSourceSelected should create a SET_EXISTING_SOURCE_SELECTED action', () => {
    const expectedAction = {
      payload: true,
      type: SET_EXISTING_SOURCE_SELECTED
    }

    expect(setExistingSourceSelected(true)).toEqual(expectedAction)
  })
  it('setNewSourceErrorText should create a SET_NEW_SOURCE_ERROR_TEXT action', () => {
    const expectedAction = {
      payload: 'abc123',
      type: SET_NEW_SOURCE_ERROR_TEXT
    }

    expect(setNewSourceErrorText('abc123')).toEqual(expectedAction)
  })
  it('setNewSourceName should create a SET_NEW_SOURCE_NAME action', () => {
    const expectedAction = {
      payload: 'newSourceName',
      type: SET_NEW_SOURCE_NAME
    }

    expect(setNewSourceName('newSourceName')).toEqual(expectedAction)
  })
  it('setNewSourceNameRequired should create a SET_NEW_SOURCE_ERROR_TEXT action', () => {
    const expectedAction = {
      payload: 'A non-blank name is required to create a new source',
      type: SET_NEW_SOURCE_ERROR_TEXT
    }
    const store = mockStore({})

    store.dispatch(setNewSourceNameRequired())
    const actions = store.getActions()
        
    expect(actions[0]).toEqual(expectedAction)
  })
  it('toggleExistingSourceDataSubmit should create a TOGGLE_ES_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_ES_SUBMIT
    }

    expect(toggleExistingSourceDataSubmit(true)).toEqual(expectedAction)
  })
  it('toggleNewSourceDataSubmit should create a TOGGLE_NS_DATA_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_DATA_SUBMIT
    }

    expect(toggleNewSourceDataSubmit(true)).toEqual(expectedAction)
  })
  it('toggleNewSourceName should create a TOGGLE_NS_NAME action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_NAME
    }

    expect(toggleNewSourceName(true)).toEqual(expectedAction)
  })
  it('toggleNewSourceNameSubmit should create a TOGGLE_NS_NAME_SUBMIT action', () => {
    const expectedAction = {
      payload: false,
      type: TOGGLE_NS_NAME_SUBMIT
    }

    expect(toggleNewSourceNameSubmit(true)).toEqual(expectedAction)
  })
})

describe('uploads reducer', () => {
  const initialState = {
    existingSourceDataSubmitDisabled: true,
    existingSourceSelected: false,
    newSourceDataSubmitDisabled: true,
    newSourceName: '',
    newSourceNameDisabled: false,
    newSourceNameErrorText: '',
    newSourceNameSubmitDisabled: true,
    newSourceSaved: false
  }
  
  it('should return the initial state', () => {
    const stateAfter = initialState

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })
  it('should handle DO_NEW_SOURCE_SAVED', () => {
    const action = {
      payload: true,
      type: DO_NEW_SOURCE_SAVED
    }
    const stateAfter = {
      existingSourceDataSubmitDisabled: true,
      existingSourceSelected: false,
      newSourceDataSubmitDisabled: true,
      newSourceName: '',
      newSourceNameDisabled: false,
      newSourceNameErrorText: '',
      newSourceNameSubmitDisabled: true,
      newSourceSaved: true
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle RESET_EXISTING_FORM', () => {
    const action = {
      type: RESET_EXISTING_FORM
    }
    const stateAfter = {
      existingSourceDataSubmitDisabled: true,
      existingSourceSelected: false,
      newSourceDataSubmitDisabled: false,
      newSourceName: 'asd123',
      newSourceNameDisabled: true,
      newSourceNameErrorText: '123asd',
      newSourceNameSubmitDisabled: false,
      newSourceSaved: true
    }
    const stateBefore = {
      ...stateAfter,
      existingSourceDataSubmitDisabled: false,
      existingSourceSelected: true
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
  it('should handle RESET_NEW_FORM', () => {
    const action = {
      type: RESET_NEW_FORM
    }
    const stateAfter = {
      existingSourceDataSubmitDisabled: false,
      existingSourceSelected: true,
      newSourceDataSubmitDisabled: true,
      newSourceName: '',
      newSourceNameDisabled: false,
      newSourceNameErrorText: '',
      newSourceNameSubmitDisabled: true,
      newSourceSaved: false
    }
    const stateBefore = {
      existingSourceDataSubmitDisabled: false,
      existingSourceSelected: true,
      newSourceDataSubmitDisabled: false,
      newSourceName: 'asd123',
      newSourceNameDisabled: true,
      newSourceNameErrorText: '123asd',
      newSourceNameSubmitDisabled: false,
      newSourceSaved: true
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
  it('should handle SET_EXISTING_SOURCE_SELECTED', () => {
    const action = {
      payload: true,
      type: SET_EXISTING_SOURCE_SELECTED
    }
    const stateAfter = {
      ...initialState,
      existingSourceSelected: true
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle SET_NEW_SOURCE_ERROR_TEXT', () => {
    const action = {
      payload: 'new Error Text',
      type: SET_NEW_SOURCE_ERROR_TEXT
    }
    const stateAfter = {
      ...initialState,
      newSourceNameErrorText: 'new Error Text'
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle SET_NEW_SOURCE_NAME', () => {
    const action = {
      payload: 'new source name',
      type: SET_NEW_SOURCE_NAME
    }
    const stateAfter = {
      ...initialState,
      newSourceName: 'new source name'
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle TOGGLE_ES_SUBMIT', () => {
    const action = {
      payload: false,
      type: TOGGLE_ES_SUBMIT
    }
    const stateAfter = {
      ...initialState,
      existingSourceDataSubmitDisabled: false
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle TOGGLE_NS_DATA_SUBMIT', () => {
    const action = {
      payload: false,
      type: TOGGLE_NS_DATA_SUBMIT
    }
    const stateAfter = {
      ...initialState,
      newSourceDataSubmitDisabled: false
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle TOGGLE_NS_NAME', () => {
    const action = {
      payload: true,
      type: TOGGLE_NS_NAME
    }
    const stateAfter = {
      ...initialState,
      newSourceNameDisabled: true
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
  it('should handle TOGGLE_NS_NAME_SUBMIT', () => {
    const action = {
      payload: false,
      type: TOGGLE_NS_NAME_SUBMIT
    }
    const stateAfter = {
      ...initialState,
      newSourceNameSubmitDisabled: false
    }

    expect(reducer(initialState, action)).toEqual(stateAfter)
  })
})