/* globals describe, it */

import expect from 'expect'
import {
  CHANGE,
  changeEditDialog,
  default as reducer,
  RESET,
  resetEditDialog
} from '../../src/js/modules/edit-dashboard-dialog'

describe('editDashboardDialog actions', () => {
  it('changeEditDialog should create a CHANGE actions', () => {
    const subtitle = 'DeleteSubtitle'
    const visibility = true
    const expectedAction = {
      payload: {value: {subtitle, visibility}},
      type: CHANGE
    }

    expect(changeEditDialog({subtitle, visibility})).toEqual(expectedAction)
  })

  it('resetEditDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetEditDialog()).toEqual(expectedAction)
  })
})

describe('editDashboardDialog reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      subtitle: '',
      title: '',
      visibility: false
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle CHANGE', () => {
    const subtitle = 'EditSubtitle1'
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