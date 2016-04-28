export const DO_NEW_SOURCE_SAVED = 'safe-app/uploads/DO_NEW_SOURCE_SAVED'
export const RESET_EXISTING_FORM = 'safe-app/uploads/RESET_EXISTING_FORM'
export const RESET_NEW_FORM = 'safe-app/uploads/RESET_NEW_FORM'
export const SET_EXISTING_SOURCE_SELECTED = 'safe-app/uploads/SET_EXISTING_SOURCE_SELECTED'
export const SET_NEW_SOURCE_ERROR_TEXT = 'safe-app/uploads/SET_NEW_SOURCE_ERROR_TEXT'
export const SET_NEW_SOURCE_NAME = 'safe-app/uploads/SET_NEW_SOURCE_NAME'
export const TOGGLE_ES_SUBMIT = 'safe-app/uploads/TOGGLE_ES_SUBMIT'
export const TOGGLE_NS_DATA_SUBMIT = 'safe-app/uploads/TOGGLE_NS_DATA_SUBMIT'
export const TOGGLE_NS_NAME = 'safe-app/uploads/TOGGLE_NS_NAME'
export const TOGGLE_NS_NAME_SUBMIT = 'safe-app/uploads/TOGGLE_NS_NAME_SUBMIT'

export const doNewSourceSaved = (saved) => ({
  type: DO_NEW_SOURCE_SAVED,
  payload: saved
})
export const resetExistingFormAction = () => ({
  type: RESET_EXISTING_FORM
})
export const resetNewFormAction = () => ({
  type: RESET_NEW_FORM
})
export const setExistingSourceSelected = (selected) => ({
  type: SET_EXISTING_SOURCE_SELECTED,
  payload: selected
})
export const setNewSourceErrorText = (text) => ({
  type: SET_NEW_SOURCE_ERROR_TEXT,
  payload: text
})
export const toggleExistingSourceDataSubmit = (enabled) => ({
  type: TOGGLE_ES_SUBMIT,
  payload: !enabled
})
export const toggleNewSourceDataSubmit = (enabled) => ({
  type: TOGGLE_NS_DATA_SUBMIT,
  payload: !enabled
})
export const toggleNewSourceName = (enabled) => ({
  type: TOGGLE_NS_NAME,
  payload: !enabled
})
export const toggleNewSourceNameSubmit = (enabled) => ({
  type: TOGGLE_NS_NAME_SUBMIT,
  payload: !enabled
})

export const clearNewSourceNameRequired = () =>
  (dispatch) => {
    dispatch(setNewSourceErrorText(''))
  }
export const disableExistingSourceDataSubmit = () =>
  (dispatch) => {
    dispatch(toggleExistingSourceDataSubmit(false))
  }
export const disableNewSourceDataSubmit = () =>
  (dispatch) => {
    dispatch(toggleNewSourceDataSubmit(false))
  }
export const disableNewSourceName = () =>
  (dispatch) => {
    dispatch(toggleNewSourceName(false))
  }
export const disableNewSourceNameSubmit = () =>
  (dispatch) => {
    dispatch(toggleNewSourceNameSubmit(false))
  }
export const enableExistingSourceDataSubmit = () =>
  (dispatch) => {
    dispatch(toggleExistingSourceDataSubmit(true))
  }
export const enableNewSourceName = () =>
  (dispatch) => {
    dispatch(toggleNewSourceName(true))
  }
export const enableNewSourceDataSubmit = () =>
  (dispatch) => {
    dispatch(toggleNewSourceDataSubmit(true))
  }
export const enableNewSourceNameSubmit = () =>
  (dispatch) => {
    dispatch(toggleNewSourceNameSubmit(true))
  }
export const setNewSourceName = (name) => ({
  type: SET_NEW_SOURCE_NAME,
  payload: name
})
export const setNewSourceNameRequired = () =>
  (dispatch) => {
    dispatch(setNewSourceErrorText('A non-blank name is required to create a new source'))
  }

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

export default (state = initialState, {payload = {}, type, ...action}) => {
  switch (type) {
    case DO_NEW_SOURCE_SAVED:
      return {
        ...state,
        newSourceSaved: payload
      }
    case RESET_EXISTING_FORM:
      return {
        ...state,
        existingSourceDataSubmitDisabled: true,
        existingSourceSelected: false
      }
    case RESET_NEW_FORM:
      return {
        ...state,
        newSourceDataSubmitDisabled: true,
        newSourceName: '',
        newSourceNameDisabled: false,
        newSourceNameErrorText: '',
        newSourceNameSubmitDisabled: true,
        newSourceSaved: false
      }
    case SET_EXISTING_SOURCE_SELECTED:
      return {
        ...state,
        existingSourceSelected: payload
      }
    case SET_NEW_SOURCE_ERROR_TEXT:
      return {
        ...state,
        newSourceNameErrorText: payload
      }
    case SET_NEW_SOURCE_NAME:
      return {
        ...state,
        newSourceName: payload
      }
    case TOGGLE_ES_SUBMIT:
      return {
        ...state,
        existingSourceDataSubmitDisabled: payload
      }
    case TOGGLE_NS_DATA_SUBMIT:
      return {
        ...state,
        newSourceDataSubmitDisabled: payload
      }
    case TOGGLE_NS_NAME:
      return {
        ...state,
        newSourceNameDisabled: payload
      }
    case TOGGLE_NS_NAME_SUBMIT:
      return {
        ...state,
        newSourceNameSubmitDisabled: payload
      }
    default:
      return state
  }
}
