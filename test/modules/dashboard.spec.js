/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  RESET,
  resetDashboard,
  SET,
  setDashboard
} from '../../src/js/modules/dashboard'

describe('dashboard actions', () => {
  it('resetDashboard should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetDashboard()).toEqual(expectedAction)
  })

  it('setDashboard should create a SET action', () => {
    const id = 'abc123'
    const subtitle = 'Subtitle'
    const title = 'Title'
    const expectedAction = {
      payload: {id, subtitle, title},
      type: SET
    }

    expect(setDashboard({id, subtitle, title})).toEqual(expectedAction)
  })
})

describe('dashboard reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {}

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle RESET', () => {
    const stateBefore = {
      id: 'abc123',
      subtitle: 'Subtitle',
      title: 'Title'
    }
    const stateAfter = {}
    const action = {
      type: RESET
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const id = 'abc123'
    const subtitle = 'Subtitle'
    const title = 'Title'
    const stateAfter = {
      id,
      subtitle,
      title
    }
    const action = {
      payload: {id, subtitle, title},
      type: SET
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})