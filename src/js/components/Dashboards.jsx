import {connect} from 'react-redux'
import {createDashboard} from '../modules/create-dashboard'
import {deleteDashboard} from '../modules/delete-dashboard'
import Dialog from 'material-ui/lib/dialog'
import {editDashboard} from '../modules/edit-dashboard'
import {fetchDashboards} from '../modules/dashboards'
import FlatButton from 'material-ui/lib/flat-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import SelectField from 'material-ui/lib/select-field'
import {setDashboard} from '../modules/dashboard'
import {setDeleteDialogVisibility} from '../modules/delete-dashboard-dialog'
import TextField from 'material-ui/lib/text-field'
// import {saveCreateDialog} from ''
// import {saveEditDialog} from ''
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {
  resetCreateDialog,
  setCreateDialogSubtitle,
  setCreateDialogTitle,
  setCreateDialogVisibility
} from '../modules/create-dashboard-dialog'
import {
  resetEditDialog,
  setEditDialogSubtitle,
  setEditDialogTitle,
  setEditDialogVisibility
} from '../modules/edit-dashboard-dialog'

const style = {
  width: '400px'
}

const getDashboardById = (dashboards, id) => {
  let dashboard

  dashboards.forEach((currentDashboard) => {
    if (currentDashboard._id !== id) {
      return
    }

    dashboard = currentDashboard
  })

  return dashboard
}

class Dashboards extends Component {
  static propTypes = {
    createDashboardDialog: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    dashboards: PropTypes.object.isRequired,
    deleteDashboardDialog: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    editDashboardDialog: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.createDashboard = ::this.createDashboard
    this.createDialogSubtitleChange = ::this.createDialogSubtitleChange
    this.createDialogTitleChange = ::this.createDialogTitleChange
    this.dashboardSelectChange = ::this.dashboardSelectChange
    this.editDashboard = ::this.editDashboard
    this.editDialogSubtitleChange = ::this.editDialogSubtitleChange
    this.editDialogTitleChange = ::this.editDialogTitleChange
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchDashboards())
  }

  createDashboard (event) {
    const {dispatch, createDashboardDialog} = this.props
    const {subtitle, title} = createDashboardDialog

    dispatch(createDashboard(subtitle, title))
    dispatch(resetCreateDialog())
  }

  createDialogSubtitleChange (event) {
    const {dispatch} = this.props

    dispatch(setCreateDialogSubtitle(event.target.value))
  }

  createDialogTitleChange (event) {
    const {dispatch} = this.props

    dispatch(setCreateDialogTitle(event.target.value))
  }

  createDialogVisibility (visible) {
    const {dispatch} = this.props

    dispatch(setCreateDialogVisibility(visible))
  }

  dashboardSelectChange (event, index, id) {
    const {dispatch, dashboards} = this.props
    const dashboard = getDashboardById(dashboards.data, id)
    const {subtitle, title} = dashboard

    dispatch(setDashboard(id, subtitle, title))
  }

  deleteDashboard (event) {
    const {dispatch, dashboard} = this.props
    const {id} = dashboard

    dispatch(setDeleteDialogVisibility(false))

    if (!id) {
      console.error('Cannot delete a dashboard that is not selected')

      return
    }

    dispatch(deleteDashboard(id))
  }

  deleteDialogVisibility (visible) {
    const {dispatch} = this.props

    dispatch(setDeleteDialogVisibility(visible))
  }

  editDashboard (event) {
    const {dispatch, dashboard, editDashboardDialog} = this.props
    const {id} = dashboard
    const {subtitle, title} = editDashboardDialog

    dispatch(setEditDialogVisibility(false))

    if (!id) {
      console.error('Cannot edit a dashboard that is not selected')

      return
    }

    dispatch(editDashboard(id, subtitle, title))
    dispatch(resetEditDialog())
  }

  editDialogSubtitleChange (event) {
    const {dispatch} = this.props

    dispatch(setEditDialogSubtitle(event.target.value))
  }

  editDialogTitleChange (event) {
    const {dispatch} = this.props

    dispatch(setEditDialogTitle(event.target.value))
  }

  editDialogVisibility (visible) {
    const {dispatch, dashboard} = this.props

    if (visible) {
      dispatch(setEditDialogSubtitle(dashboard.subtitle))
      dispatch(setEditDialogTitle(dashboard.title))
    }

    dispatch(setEditDialogVisibility(visible))
  }

  render () {
    const {
      createDashboardDialog,
      dashboard,
      dashboards,
      deleteDashboardDialog,
      editDashboardDialog
    } = this.props
    const {id, subtitle, title} = dashboard
    const {
      subtitle: createSubtitle,
      title: createTitle,
      visibility: createVisibility
    } = createDashboardDialog
    const {
      visibility: deleteVisibility
    } = deleteDashboardDialog
    const {
      subtitle: editSubtitle,
      title: editTitle,
      visibility: editVisibility
    } = editDashboardDialog

    const createActions = [
      <FlatButton
        key={0}
        label='Cancel'
        secondary={true}
        onTouchTap={() => (this.createDialogVisibility(false))}
      />,
      <FlatButton
        key={1}
        label='Create'
        primary={true}
        onTouchTap={this.createDashboard}
      />
    ]
    const deleteActions = [
      <FlatButton
        key={0}
        label='Cancel'
        secondary={true}
        onTouchTap={() => (this.deleteDialogVisibility(false))}
      />,
      <FlatButton
        key={1}
        label='Delete'
        primary={true}
        onTouchTap={() => (this.deleteDashboard(false))}
      />
    ]
    const editActions = [
      <FlatButton
        key={0}
        label='Cancel'
        secondary={true}
        onTouchTap={() => (this.editDialogVisibility(false))}
      />,
      <FlatButton
        key={1}
        label='Save'
        primary={true}
        onTouchTap={this.editDashboard}
      />
    ]

    return (
      <div>
        <Dialog
          actions={createActions}
          contentStyle={style}
          modal={false}
          open={createVisibility}
          title='Create a Dashboard'
          onRequestClose={() => (this.createDialogVisibility(false))}
        >
          <TextField
            floatingLabelText='Title'
            value={createTitle}
            onChange={this.createDialogTitleChange}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={createSubtitle}
            onChange={this.createDialogSubtitleChange}
          />
        </Dialog>
        <Dialog
          actions={deleteActions}
          contentStyle={style}
          modal={false}
          open={deleteVisibility}
          title='Delete a Dashboard'
          onRequestClose={() => (this.deleteDialogVisibility(false))}
        >
          <p>Are you sure you want to delete this dashboard?</p>
        </Dialog>
        <Dialog
          actions={editActions}
          contentStyle={style}
          modal={false}
          open={editVisibility}
          title='Edit a Dashboard'
          onRequestClose={() => (this.editDialogVisibility(false))}
        >
          <TextField
            floatingLabelText='Title'
            value={editTitle}
            onChange={this.editDialogTitleChange}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={editSubtitle}
            onChange={this.editDialogSubtitleChange}
          />
        </Dialog>
        <header style={header}>
          <h1>Dashboards {title ? `/ ${title}` : ''}</h1>
        </header>
        <main style={main}>
          <p>{subtitle}</p>
          <SelectField
            floatingLabelText='Select a Dashboard'
            fullWidth={true}
            value={id}
            onChange={this.dashboardSelectChange}
          >
            {dashboards.data.map(function (dashboard) {
              return (
                <MenuItem
                  key={dashboard._id}
                  primaryText={dashboard.title}
                  value={dashboard._id}
                />
              )
            })}
          </SelectField>

          <FlatButton
            disabled={!id}
            label='Edit'
            onTouchTap={() => (this.editDialogVisibility(true))}
          />
          <FlatButton
            disabled={!id}
            label='Delete'
            onTouchTap={() => (this.deleteDialogVisibility(true))}
          />
          <FlatButton
            label='Create'
            primary={true}
            onTouchTap={() => (this.createDialogVisibility(true))}
          />
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  createDashboardDialog: state.createDashboardDialog,
  dashboard: state.dashboard,
  dashboards: state.dashboards,
  deleteDashboardDialog: state.deleteDashboardDialog,
  editDashboardDialog: state.editDashboardDialog
}))(Dashboards)