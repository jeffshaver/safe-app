export const OPEN_DASHBOARD_MENU = 'safe-app/dashboard-menus/OPEN_DASHBOARD_MENU'
export const OPEN_VIZ_MENU = 'safe-app/dashboard-menus/OPEN_VIZ_MENU'

export const hideDashboardMenu = () => ({
  type: OPEN_DASHBOARD_MENU,
  payload: {
    openDashboardMenu: false
  }
})

export const hideVizMenu = () => ({
  type: OPEN_VIZ_MENU,
  payload: {
    openVizMenu: false
  }
})

export const showDashboardMenu = (target) => ({
  type: OPEN_DASHBOARD_MENU,
  payload: {
    dashboardMenuTarget: target,
    openDashboardMenu: true
  }
})

export const showVizMenu = (target) => ({
  type: OPEN_VIZ_MENU,
  payload: {
    vizMenuTarget: target,
    openVizMenu: true
  }
})

const initialState = {
  openDashboardMenu: false,
  openVizMenu: false
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  switch (type) {
    case OPEN_DASHBOARD_MENU:
      return {
        openVizMenu: state.openVizMenu,
        ...payload
      }
    case OPEN_VIZ_MENU:
      return {
        openDashboardMenu: state.openDashboardMenu,
        ...payload
      }
    default:
      return state
  }
}