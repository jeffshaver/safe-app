/* globals describe, it */

import expect from 'expect'
import {
  SET_SOURCE
} from '../../src/js/action-types'
import {
  setSource
} from '../../src/js/actions'

describe('source actions', () => {
  it('setSource should create an SET_SOURCE action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: SET_SOURCE,
      payload: {source}
    }

    expect(setSource(source)).toEqual(expectedAction)
  })
})