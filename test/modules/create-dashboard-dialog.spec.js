/* globals describe, it */

import expect from 'expect'
import {
  CHANGE,
  changeCreateDialog,
  default as reducer,
  RESET,
  resetCreateDialog
} from '../../src/js/modules/create-dashboard-dialog'

describe('createDashboardDialog actions', () => {
  it('changeCreateDialog should create a CHANGE actions', () => {
    const subtitle = 'CreateSubtitle'
    const visibility = true
    const expectedAction = {
      payload: {value: {subtitle, visibility}},
      type: CHANGE
    }

    expect(changeCreateDialog({subtitle, visibility})).toEqual(expectedAction)
  })

  it('resetCreateDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetCreateDialog()).toEqual(expectedAction)
  })
})

describe('createDashboardDialog reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      subtitle: '',
      title: '',
      visibility: false
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle CHANGE', () => {
    const subtitle = 'CreateSubtitle1'
    const visibility = true
    const value = {subtitle, visibility}
    const stateAfter = {
      subtitle,
      title: '',
      visibility
    }
    const action = {
      payload: {value},
      type: CHANGE
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle RESET', () => {
    const stateBefore = {
      subtitle: 'Subtitle',
      title: 'Title',
      visibility: true
    }
    const stateAfter = {
      subtitle: '',
      title: '',
      visibility: false
    }
    const action = {
      type: RESET
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})