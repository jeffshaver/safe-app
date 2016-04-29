export const RESET = 'safe-app/create-dashboard-dialog/RESET'
export const SET_SUBTITLE = 'safe-app/create-dashboard-dialog/SET_SUBTITLE'
export const SET_TITLE = 'safe-app/create-dashboard-dialog/SET_TITLE'
export const SET_VISIBILITY = 'safe-app/create-dashboard-dialog/SET_VISIBILITY'

export const resetCreateDialog = () => ({
  type: RESET
})
export const setCreateDialogSubtitle = (subtitle) => ({
  payload: {subtitle},
  type: SET_SUBTITLE
})

export const setCreateDialogTitle = (title) => ({
  payload: {title},
  type: SET_TITLE
})

export const setCreateDialogVisibility = (visibility) => ({
  payload: {visibility},
  type: SET_VISIBILITY
})

const initialState = {
  subtitle: '',
  title: '',
  visibility: false
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {subtitle, title, visibility} = payload

  switch (type) {
    case RESET:
      return initialState
    case SET_SUBTITLE:
      return {
        ...state,
        subtitle
      }
    case SET_TITLE:
      return {
        ...state,
        title
      }
    case SET_VISIBILITY:
      return {
        ...state,
        visibility
      }
    default:
      return state
  }
}