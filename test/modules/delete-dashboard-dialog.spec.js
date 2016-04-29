/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  RESET,
  resetDeleteDialog,
  SET_SUBTITLE,
  SET_TITLE,
  SET_VISIBILITY,
  setDeleteDialogSubtitle,
  setDeleteDialogTitle,
  setDeleteDialogVisibility
} from '../../src/js/modules/delete-dashboard-dialog'

describe('deleteDashboardDialog actions', () => {
  it('resetDeleteDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetDeleteDialog()).toEqual(expectedAction)
  })
  it('setDeleteDialogSubtitle should create a SET_SUBTITLE action', () => {
    const subtitle = 'DeleteSubtitle'
    const expectedAction = {
      payload: {subtitle},
      type: SET_SUBTITLE
    }

    expect(setDeleteDialogSubtitle(subtitle)).toEqual(expectedAction)
  })

  it('setDeleteDialogTitle should create a SET_TITLE action', () => {
    const title = 'DeleteTitle'
    const expectedAction = {
      payload: {title},
      type: SET_TITLE
    }

    expect(setDeleteDialogTitle(title)).toEqual(expectedAction)
  })

  it('setDeleteDialogVisibility should create a SET_VISIBILITY action', () => {
    const visibility = true
    const expectedAction = {
      payload: {visibility},
      type: SET_VISIBILITY
    }

    expect(setDeleteDialogVisibility(visibility)).toEqual(expectedAction)
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
    const subtitle = 'DeleteSubtitle'
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
    const title = 'DeleteTitle'
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