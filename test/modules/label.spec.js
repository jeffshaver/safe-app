/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  SET,
  setLabel
} from '../../src/js/modules/label'

describe('label actions', () => {
  it('setLabel should create a SET action', () => {
    const label = 'Anne Arundel'
    const expectedAction = {
      type: SET,
      payload: {label}
    }

    expect(setLabel(label)).toEqual(expectedAction)
  })
})

describe('label reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = 'Anne Arundel'
    const action = {
      type: SET,
      payload: {label: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})