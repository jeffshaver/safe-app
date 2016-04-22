/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  SET,
  setLongitude
} from '../../src/js/modules/longitude'

describe('longitude actions', () => {
  it('setLongitude should create a SET action', () => {
    const longitude = -105.02
    const expectedAction = {
      type: SET,
      payload: {longitude}
    }

    expect(setLongitude(longitude)).toEqual(expectedAction)
  })
})

describe('longitude reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = -105.02
    const action = {
      type: SET,
      payload: {longitude: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})