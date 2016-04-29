/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  RESET,
  resetEditDialog,
  SET_SUBTITLE,
  SET_TITLE,
  SET_VISIBILITY,
  setEditDialogSubtitle,
  setEditDialogTitle,
  setEditDialogVisibility
} from '../../src/js/modules/edit-dashboard-dialog'

describe('editDashboardDialog actions', () => {
  it('resetEditDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetEditDialog()).toEqual(expectedAction)
  })

  it('setEditDialogSubtitle should create a SET_SUBTITLE action', () => {
    const subtitle = 'EditSubtitle'
    const expectedAction = {
      payload: {subtitle},
      type: SET_SUBTITLE
    }

    expect(setEditDialogSubtitle(subtitle)).toEqual(expectedAction)
  })

  it('setEditDialogTitle should create a SET_TITLE action', () => {
    const title = 'EditTitle'
    const expectedAction = {
      payload: {title},
      type: SET_TITLE
    }

    expect(setEditDialogTitle(title)).toEqual(expectedAction)
  })

  it('setEditDialogVisibility should create a SET_VISIBILITY action', () => {
    const visibility = true
    const expectedAction = {
      payload: {visibility},
      type: SET_VISIBILITY
    }

    expect(setEditDialogVisibility(visibility)).toEqual(expectedAction)
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

  it('should handle SET_SUBTITLE', () => {
    const subtitle = 'EditSubtitle'
    const stateAfter = {
      subtitle,
      title: '',
      visibility: false
    }
    const action = {
      payload: {subtitle},
      type: SET_SUBTITLE
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SET_TITLE', () => {
    const title = 'EditTitle'
    const stateAfter = {
      subtitle: '',
      title,
      visibility: false
    }
    const action = {
      payload: {title},
      type: SET_TITLE
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })

  it('should handle SET_VISIBILITY', () => {
    const visibility = true
    const stateAfter = {
      subtitle: '',
      title: '',
      visibility
    }
    const action = {
      payload: {visibility},
      type: SET_VISIBILITY
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})