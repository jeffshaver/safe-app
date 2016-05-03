export const CHANGE = 'safe-app/edit-dashboard-dialog/CHANGE'
export const RESET = 'safe-app/edit-dashboard-dialog/RESET'

export const changeEditDialog = (value) => ({
  payload: {value},
  type: CHANGE
})

export const resetEditDialog = () => ({
  type: RESET
})

const initialState = {
  subtitle: '',
  title: '',
  visibility: false
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {value} = payload

  switch (type) {
    case CHANGE:
      return {
        ...state,
        ...value
      }
    case RESET:
      return initialState
    default:
      return state
  }
}