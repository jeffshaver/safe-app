/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  RESET,
  resetCreateDialog,
  SET_SUBTITLE,
  SET_TITLE,
  SET_VISIBILITY,
  setCreateDialogSubtitle,
  setCreateDialogTitle,
  setCreateDialogVisibility
} from '../../src/js/modules/create-dashboard-dialog'

describe('createDashboardDialog actions', () => {
  it('resetCreateDialog should create a RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetCreateDialog()).toEqual(expectedAction)
  })

  it('setCreateDialogSubtitle should create a SET_SUBTITLE action', () => {
    const subtitle = 'CreateSubtitle'
    const expectedAction = {
      payload: {subtitle},
      type: SET_SUBTITLE
    }

    expect(setCreateDialogSubtitle(subtitle)).toEqual(expectedAction)
  })

  it('setCreateDialogTitle should create a SET_TITLE action', () => {
    const title = 'CreateTitle'
    const expectedAction = {
      payload: {title},
      type: SET_TITLE
    }

    expect(setCreateDialogTitle(title)).toEqual(expectedAction)
  })

  it('setCreateDialogVisibility should create a SET_VISIBILITY action', () => {
    const visibility = true
    const expectedAction = {
      payload: {visibility},
      type: SET_VISIBILITY
    }

    expect(setCreateDialogVisibility(visibility)).toEqual(expectedAction)
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
    const subtitle = 'CreateSubtitle'
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
    const title = 'CreateTitle'
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