/* globals describe, it */

import expect from 'expect'
import {
  HYDRATE,
  hydrateSource,
  default as reducer,
  RESET,
  resetSource,
  SET,
  setSource
} from '../../src/js/modules/source'

describe('source actions', () => {
  it('hydrateSource should create a HYDRATE action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: HYDRATE,
      state: source
    }

    expect(hydrateSource(source)).toEqual(expectedAction)
  })

  it('resetSource should create an SET action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: RESET
    }

    expect(resetSource(source)).toEqual(expectedAction)
  })

  it('setSource should create an SET action', () => {
    const source = 'SourceA'
    const expectedAction = {
      type: SET,
      payload: {source}
    }

    expect(setSource(source)).toEqual(expectedAction)
  })
})

describe('source reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = ''

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle RESET', () => {
    const stateAfter = ''
    const action = {
      type: RESET
    }
    
    expect(reducer('SourceA', action)).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = 'SourceA'
    const action = {
      type: SET,
      payload: {source: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})