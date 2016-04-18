export const HYDRATE = 'safe-app/source/HYDRATE'
export const SET = 'safe-app/source/SET'

export const hydrateSource = (source) => ({
  type: HYDRATE,
  state: source
})

export const setSource = (source) => ({
  type: SET,
  payload: {source}
})

export default (state = '', action) => {
  const {source} = action.payload || {}

  switch (action.type) {
    case SET:
      return source
    default:
      return state
  }
}