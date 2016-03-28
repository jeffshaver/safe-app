/* global describe, it */

import expect from 'expect'
import {
  SET_DIALOG_OPEN
} from '../../src/js/actionTypes'
import {
  dialog as reducer
} from '../../src/js/reducers'

describe('dialog reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = false

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should return true if payload is true', () => {
    const stateAfter = true

    const action = {
      payload: true,
      type: SET_DIALOG_OPEN
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})