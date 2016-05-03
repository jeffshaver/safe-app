export const CHANGE = 'safe-app/delete-dashboard-dialog/CHANGE'
export const RESET = 'safe-app/delete-dashboard-dialog/RESET'

export const changeDeleteDialog = (value) => ({
  payload: {value},
  type: CHANGE
})

export const resetDeleteDialog = () => ({
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