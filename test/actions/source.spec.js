/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE_SOURCE,
  SET_SOURCE
} from '../../src/js/action-types'
import {
  hydrateSource,
  setSource
} from '../../src/js/actions'

describe('source actions', () => {
  it('hydrateSource should create a HYDRATE_SOURCE action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: HYDRATE_SOURCE,
      state: source
    }

    expect(hydrateSource(source)).toEqual(expectedAction)
  })

  it('setSource should create an SET_SOURCE action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: SET_SOURCE,
      payload: {source}
    }

    expect(setSource(source)).toEqual(expectedAction)
  })
})