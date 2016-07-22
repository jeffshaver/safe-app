/* globals describe, it */

import expect from 'expect'
import {
  hideDashboardMenu,
  hideVizMenu,
  OPEN_DASHBOARD_MENU,
  OPEN_VIZ_MENU,
  default as reducer,
  showDashboardMenu,
  showVizMenu
} from '../../src/js/modules/dashboard-menus'

describe('dashboardMenus actions', () => {
  it('hideDashboardMenu should create a OPEN_DASHBOARD_MENU action', () => {
    const expectedAction = {
      payload: {openDashboardMenu: false},
      type: OPEN_DASHBOARD_MENU
    }

    expect(hideDashboardMenu()).toEqual(expectedAction)
  })

  it('hideVizMenu should create a OPEN_VIZ_MENU action', () => {
    const expectedAction = {
      payload: {openVizMenu: false},
      type: OPEN_VIZ_MENU
    }

    expect(hideVizMenu()).toEqual(expectedAction)
  })

  it('showDashboardMenu should create a OPEN_DASHBOARD_MENU action', () => {
    const target = 'target'
    const expectedAction = {
      payload: {
        dashboardMenuTarget: target,
        openDashboardMenu: true
      },
      type: OPEN_DASHBOARD_MENU
    }

    expect(showDashboardMenu(target)).toEqual(expectedAction)
  })

  it('showVizMenu should create a OPEN_VIZ_MENU action', () => {
    const target = 'target'
    const expectedAction = {
      payload: {
        vizMenuTarget: target,
        openVizMenu: true
      },
      type: OPEN_VIZ_MENU
    }

    expect(showVizMenu(target)).toEqual(expectedAction)
  })
})

describe('dashboardMenus reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      openDashboardMenu: false,
      openVizMenu: false
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle OPEN_DASHBOARD_MENU #1', () => {
    const stateBefore = {
      dashboardMenuTarget: 'target',
      openDashboardMenu: true,
      openVizMenu: false
    }
    const stateAfter = {
      openDashboardMenu: false,
      openVizMenu: false
    }
    const action = {
      payload: {
        openDashboardMenu: false
      },
      type: OPEN_DASHBOARD_MENU
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle OPEN_DASHBOARD_MENU #2', () => {
    const stateBefore = {
      openDashboardMenu: false,
      openVizMenu: false
    }
    const stateAfter = {
      dashboardMenuTarget: 'target',
      openDashboardMenu: true,
      openVizMenu: false
    }
    const action = {
      payload: {
        dashboardMenuTarget: 'target',
        openDashboardMenu: true
      },
      type: OPEN_DASHBOARD_MENU
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle OPEN_VIZ_MENU #1', () => {
    const stateBefore = {
      vizMenuTarget: 'target',
      openDashboardMenu: false,
      openVizMenu: true
    }
    const stateAfter = {
      openDashboardMenu: false,
      openVizMenu: false
    }
    const action = {
      payload: {
        openVizMenu: false
      },
      type: OPEN_VIZ_MENU
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle OPEN_VIZ_MENU #2', () => {
    const stateBefore = {
      openDashboardMenu: false,
      openVizMenu: false
    }
    const stateAfter = {
      vizMenuTarget: 'target',
      openDashboardMenu: false,
      openVizMenu: true
    }
    const action = {
      payload: {
        vizMenuTarget: 'target',
        openVizMenu: true
      },
      type: OPEN_VIZ_MENU
    }

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})