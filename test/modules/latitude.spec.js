/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  SET,
  setLatitude
} from '../../src/js/modules/latitude'

describe('latitude actions', () => {
  it('setLatitude should create a SET action', () => {
    const latitude = 39.61
    const expectedAction = {
      type: SET,
      payload: {latitude}
    }

    expect(setLatitude(latitude)).toEqual(expectedAction)
  })
})

describe('latitude reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = 39.61
    const action = {
      type: SET,
      payload: {latitude: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})