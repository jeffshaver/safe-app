/* globals describe, it */

import expect from 'expect'
import {
  CHANGE,
  changeDeleteDialog,
  default as reducer,
  RESET,
  resetDeleteDialog
} from '../../src/js/modules/delete-dashboard-dialog'

describe('deleteDashboardDialog actions', () => {
  it('changeDeleteDialog should create a CHANGE action', () => {
    const subtitle = 'DeleteSubtitle'
    const visibility = true
    const expectedAction = {
      payload: {value: {subtitle, visibility}},
      type: CHANGE
    }

    expect(changeDeleteDialog({subtitle, visibility})).toEqual(expectedAction)
  })

  it('resetDeleteDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetDeleteDialog()).toEqual(expectedAction)
  })
})

describe('deleteDashboardDialog reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      subtitle: '',
      title: '',
      visibility: false
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle CHANGE', () => {
    const subtitle = 'DeleteSubtitle1'
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