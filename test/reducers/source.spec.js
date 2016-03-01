/* globals describe, it */

import expect from 'expect'
import {
  SET_SOURCE
} from '../../src/js/actionTypes'
import {
  source as reducer
} from '../../src/js/reducers'

describe('source reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = ''

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle SET_SOURCE', () => {
    const newSource = 'SourceA'

    expect(reducer(undefined, {
      type: SET_SOURCE,
      value: newSource
    })).toEqual(newSource)
  })
})