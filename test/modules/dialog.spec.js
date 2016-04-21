/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  TOGGLE,
  toggleDialog
} from '../../src/js/modules/dialog'

describe('dialog actions', () => {
  it('toggleDialog should create a TOGGLE action', () => {
    const value = true
    const expectedAction = {
      payload: {value},
      type: TOGGLE
    }

    expect(toggleDialog(value)).toEqual(expectedAction)
  })
})

describe('dialog reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = false

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle TOGGLE', () => {
    const stateAfter = true

    const action = {
      payload: {value: stateAfter},
      type: TOGGLE
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})