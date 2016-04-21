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

export default (state = '', {payload = {}, type, ...action}) => {
  const {source} = payload

  switch (type) {
    case SET:
      return source
    default:
      return state
  }
}