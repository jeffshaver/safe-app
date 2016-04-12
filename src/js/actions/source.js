import {
  HYDRATE_SOURCE,
  SET_SOURCE
} from '../action-types'

export const hydrateSource = (source) => ({
  type: HYDRATE_SOURCE,
  state: source
})

export const setSource = (source) => ({
  type: SET_SOURCE,
  payload: {source}
})