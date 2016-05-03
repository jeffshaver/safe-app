export const RESET = 'safe-app/create-dashboard-dialog/RESET'
export const CHANGE = 'safe-app/create-dashboard-dialog/CHANGE'

export const changeCreateDialog = (value) => ({
  payload: {value},
  type: CHANGE
})

export const resetCreateDialog = () => ({
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