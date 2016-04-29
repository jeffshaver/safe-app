export const RESET = 'safe-app/edit-dashboard-dialog/RESET'
export const SET_SUBTITLE = 'safe-app/edit-dashboard-dialog/SET_SUBTITLE'
export const SET_TITLE = 'safe-app/edit-dashboard-dialog/SET_TITLE'
export const SET_VISIBILITY = 'safe-app/edit-dashboard-dialog/SET_VISIBILITY'

export const resetEditDialog = () => ({
  type: RESET
})

export const setEditDialogSubtitle = (subtitle) => ({
  payload: {subtitle},
  type: SET_SUBTITLE
})

export const setEditDialogTitle = (title) => ({
  payload: {title},
  type: SET_TITLE
})

export const setEditDialogVisibility = (visibility) => ({
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