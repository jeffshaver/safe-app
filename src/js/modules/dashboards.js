import {apiUri} from '../../../config'
import fetch from 'isomorphic-fetch'

// HELPER FUNCTIONS

const getDashboardIndexById = (dashboards, id) => {
  let index

  dashboards.forEach((dashboard, i) => {
    if (dashboard._id !== id) {
      return
    }

    index = i
  })

  return index
}

// ACTION CONSTANTS
export const CREATE_FAILURE = 'safe-app/dashboards/CREATE_FAILURE'
export const CREATE_REQUEST = 'safe-app/dashboards/CREATE_REQUEST'
export const CREATE_SUCCESS = 'safe-app/dashboards/CREATE_SUCCESS'
export const DELETE_FAILURE = 'safe-app/dashboards/DELETE_FAILURE'
export const DELETE_REQUEST = 'safe-app/dashboards/DELETE_REQUEST'
export const DELETE_SUCCESS = 'safe-app/dashboards/DELETE_SUCCESS'
export const EDIT_FAILURE = 'safe-app/dashboards/EDIT_FAILURE'
export const EDIT_REQUEST = 'safe-app/dashboards/EDIT_REQUEST'
export const EDIT_SUCCESS = 'safe-app/dashboards/EDIT_SUCCESS'
export const GET_FAILURE = 'safe-app/dashboards/GET_FAILURE'
export const GET_REQUEST = 'safe-app/dashboards/GET_REQUEST'
export const GET_SUCCESS = 'safe-app/dashboards/GET_SUCCESS'
export const INITIALIZE_CREATE_DIALOG = 'safe-app/dashboards/INITIALIZE_CREATE_DIALOG'
export const INITIALIZE_EDIT_DIALOG = 'safe-app/dashboards/INITIALIZE_EDIT_DIALOG'
export const RESET_DASHBOARD_INFORMATION = 'safe-app/dashboards/RESET_DASHBOARD_INFORMATION'
export const SAVE_CREATE_DIALOG = 'safe-app/dashboards/SAVE_CREATE_DIALOG'
export const SAVE_EDIT_DIALOG = 'safe-app/dashboards/SAVE_EDIT_DIALOG'
export const SELECT = 'safe-app/dashboards/SELECT'
export const SET_CREATE_DIALOG_SUBTITLE = 'safe-app/dashboards/SET_CREATE_DIALOG_SUBTITLE'
export const SET_CREATE_DIALOG_TITLE = 'safe-app/dashboards/SET_CREATE_DIALOG_TITLE'
export const SET_CREATE_DIALOG_VISIBILITY = 'safe-app/dashboards/SET_CREATE_DIALOG_VISIBILITY'
export const SET_DELETE_DIALOG_VISIBILITY = 'safe-app/dashboards/SET_DELETE_DIALOG_VISIBILITY'
export const SET_EDIT_DIALOG_SUBTITLE = 'safe-app/dashboards/SET_EDIT_DIALOG_SUBTITLE'
export const SET_EDIT_DIALOG_TITLE = 'safe-app/dashboards/SET_EDIT_DIALOG_TITLE'
export const SET_EDIT_DIALOG_VISIBILITY = 'safe-app/dashboards/SET_EDIT_DIALOG_VISIBILITY'

// ACTIONS
export const createDashboardFailure = () => ({
  type: CREATE_FAILURE
})

export const createDashboardRequest = () => ({
  type: CREATE_REQUEST
})

export const createDashboardSuccess = (data) => ({
  didInvalidate: false,
  isFetching: false,
  payload: {data},
  recievedAt: Date.now(),
  type: CREATE_SUCCESS
})

export const createDashboard = (payload) =>
  (dispatch) => {
    return fetch(`${apiUri}/dashboards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json(), (err) => console.error(err))
    .then((json) => {
      dispatch(createDashboardSuccess(json))
      // FUTURE: OPTIMISTIC UPDATE INSTEAD
      dispatch(fetchDashboards())
        .then(() => {
          dispatch(selectDashboard(json._id))
        })
    })
  }
export const deleteDashboardFailure = () => ({
  type: DELETE_FAILURE
})

export const deleteDashboardRequest = () => ({
  type: DELETE_REQUEST
})

export const deleteDashboardSuccess = (data) => ({
  didInvalidate: false,
  isFetching: false,
  payload: {data},
  recievedAt: Date.now(),
  type: DELETE_SUCCESS
})

// ERROR: Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.
export const deleteDashboard = (id) =>
  (dispatch) => {
    return fetch(`${apiUri}/dashboards/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json(), (err) => console.error(err))
    .then((json) => {
      dispatch(deleteDashboardSuccess(json))
      dispatch(resetDashboardInformation())
      // FUTURE: OPTIMISTIC UPDATE INSTEAD
      dispatch(fetchDashboards())
    })
  }

export const editDashboardFailure = () => ({
  type: EDIT_FAILURE
})

export const editDashboardRequest = () => ({
  type: EDIT_REQUEST
})

export const editDashboardSuccess = (data) => ({
  didInvalidate: false,
  isFetching: false,
  payload: {data},
  recievedAt: Date.now(),
  type: EDIT_SUCCESS
})

// ERROR: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
export const editDashboard = (payload) =>
  (dispatch) => {
    const {id} = payload

    return fetch(`${apiUri}/dashboards/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        // 'Access-Control-Allow-Headers': 'Accept, Content-Type'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json(), (err) => console.error(err))
    .then((json) => {
      dispatch(editDashboardSuccess(json))
      // FUTURE: OPTIMISTIC UPDATE INSTEAD
      dispatch(fetchDashboards())
    })
  }

export const fetchDashboardsFailure = () => ({
  type: GET_FAILURE
})

export const fetchDashboardsRequest = () => ({
  type: GET_REQUEST
})

export const fetchDashboardsSuccess = (data) => ({
  didInvalidate: false,
  isFetching: false,
  payload: {data},
  recievedAt: Date.now(),
  type: GET_SUCCESS
})

export const fetchDashboards = () =>
  (dispatch) => {
    dispatch(fetchDashboardsRequest())

    return fetch(`${apiUri}/dashboards`)
      .then((response) => response.json(), (err) => console.error(err))
      .then((json) => {
        dispatch(fetchDashboardsSuccess(json))

        return Promise.resolve()
      })
  }

export const initializeEditDialog = () => ({
  type: INITIALIZE_EDIT_DIALOG
})

export const resetDashboardInformation = () => ({
  type: RESET_DASHBOARD_INFORMATION
})

export const saveCreateDialog = () => ({
  type: SAVE_CREATE_DIALOG
})

export const saveEditDialog = () => ({
  type: SAVE_EDIT_DIALOG
})

export const selectDashboard = (id) => ({
  payload: {id},
  type: SELECT
})

export const setCreateDialogSubtitle = (value) => ({
  payload: {value},
  type: SET_CREATE_DIALOG_SUBTITLE
})

export const setCreateDialogTitle = (value) => ({
  payload: {value},
  type: SET_CREATE_DIALOG_TITLE
})

export const setCreateDialogVisibility = (value) => ({
  payload: {value},
  type: SET_CREATE_DIALOG_VISIBILITY
})

export const setDeleteDialogVisibility = (value) => ({
  payload: {value},
  type: SET_DELETE_DIALOG_VISIBILITY
})

export const setEditDialogVisibility = (value) => ({
  payload: {value},
  type: SET_EDIT_DIALOG_VISIBILITY
})

export const setEditDialogSubtitle = (value) => ({
  payload: {value},
  type: SET_EDIT_DIALOG_SUBTITLE
})

export const setEditDialogTitle = (value) => ({
  payload: {value},
  type: SET_EDIT_DIALOG_TITLE
})

// REDUCER
const initialState = {
  createDialogSubtitle: '',
  createDialogTitle: '',
  createDialogVisibility: false,
  dashboards: {
    data: [],
    didInvalidate: false,
    isFetching: false,
    lastUpdated: null
  },
  deleteDialogVisibility: false,
  editDialogSubtitle: '',
  editDialogTitle: '',
  editDialogVisibility: false,
  selectedDashboardId: null,
  subtitle: '',
  title: ''
}

export default (state = initialState, action) => {
  const {data, id, recievedAt, value} = action.payload || {}

  switch (action.type) {
    case GET_SUCCESS:
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          data,
          didInvalidate: false,
          isFetching: false,
          lastUpdated: recievedAt
        }
      }
    case INITIALIZE_EDIT_DIALOG:
      return {
        ...state,
        editDialogSubtitle: state.subtitle,
        editDialogTitle: state.title
      }
    case SAVE_CREATE_DIALOG:
      return {
        ...state,
        subtitle: state.createDialogSubtitle,
        createDialogSubtitle: '',
        title: state.createDialogTitle,
        createDialogTitle: ''
      }
    case SAVE_EDIT_DIALOG:
      return {
        ...state,
        subtitle: state.editDialogSubtitle,
        editDialogSubtitle: '',
        title: state.editDialogTitle,
        editDialogTitle: ''
      }
    case SELECT:
      const index = getDashboardIndexById(state.dashboards.data, id)

      return {
        ...state,
        selectedDashboardId: id,
        subtitle: state.dashboards.data[index]
          ? state.dashboards.data[index].subtitle
          : '',
        title: state.dashboards.data[index]
          ? state.dashboards.data[index].title
          : ''
      }
    case SET_CREATE_DIALOG_SUBTITLE:
      return {
        ...state,
        createDialogSubtitle: value
      }
    case SET_CREATE_DIALOG_TITLE:
      return {
        ...state,
        createDialogTitle: value
      }
    case SET_CREATE_DIALOG_VISIBILITY:
      return {
        ...state,
        createDialogVisibility: value
      }
    case SET_DELETE_DIALOG_VISIBILITY:
      return {
        ...state,
        deleteDialogVisibility: value
      }
    case SET_EDIT_DIALOG_SUBTITLE:
      return {
        ...state,
        editDialogSubtitle: value
      }
    case SET_EDIT_DIALOG_TITLE:
      return {
        ...state,
        editDialogTitle: value
      }
    case SET_EDIT_DIALOG_VISIBILITY:
      return {
        ...state,
        editDialogVisibility: value
      }
    case RESET_DASHBOARD_INFORMATION:
      return {
        createDialogSubtitle: '',
        createDialogTitle: '',
        createDialogVisibility: false,
        dashboards: state.dashboards,
        deleteDialogVisibility: false,
        editDialogSubtitle: '',
        editDialogTitle: '',
        editDialogVisibility: false,
        selectedDashboardId: null,
        subtitle: '',
        title: ''
      }
    default:
      return state
  }
}