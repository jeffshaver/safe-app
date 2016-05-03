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
import TextField from 'material-ui/lib/text-field'
import {
  changeCreateDialog,
  resetCreateDialog
} from '../modules/create-dashboard-dialog'
import {
  changeDeleteDialog,
  resetDeleteDialog
} from '../modules/delete-dashboard-dialog'
import {
  changeEditDialog,
  resetEditDialog
} from '../modules/edit-dashboard-dialog'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'

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
    this.deleteDashboard = ::this.deleteDashboard
    this.editDashboard = ::this.editDashboard
    this.selectDashboard = ::this.selectDashboard
    this.changeCreateDialogSubtitle = this.changeCreateDialog.bind(this, 'subtitle')
    this.changeCreateDialogTitle = this.changeCreateDialog.bind(this, 'title')
    this.hideCreateDialog = this.changeCreateDialog.bind(this, 'visibility', false)
    this.showCreateDialog = this.changeCreateDialog.bind(this, 'visibility', true)
    this.changeEditDialogSubtitle = this.changeEditDialog.bind(this, 'subtitle')
    this.changeEditDialogTitle = this.changeEditDialog.bind(this, 'title')
    this.hideEditDialog = this.changeEditDialog.bind(this, 'visibility', false)
    this.showEditDialog = this.changeEditDialog.bind(this, 'visibility', true)
    this.hideDeleteDialog = this.changeDeleteDialog.bind(this, 'visibility', false)
    this.showDeleteDialog = this.changeDeleteDialog.bind(this, 'visibility', true)
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchDashboards())
  }

  changeCreateDialog (property, event) {
    const {dispatch} = this.props
    const value = event && event.target && event.target.value || event

    dispatch(changeCreateDialog({[property]: value}))
  }

  changeDeleteDialog (property, event) {
    const {dispatch} = this.props
    const value = event && event.target && event.target.value || event

    dispatch(changeDeleteDialog({[property]: value}))
  }

  changeEditDialog (property, event) {
    const {dashboard, dispatch} = this.props
    const {subtitle, title} = dashboard
    const value = event && event.target && event.target.value || event

    if (property === 'visibility' && value) {
      dispatch(changeEditDialog({subtitle, title}))
    }

    dispatch(changeEditDialog({[property]: value}))
  }

  createDashboard (event) {
    const {dispatch, createDashboardDialog} = this.props
    const {subtitle, title} = createDashboardDialog

    dispatch(createDashboard(subtitle, title))
    dispatch(resetCreateDialog())
  }

  deleteDashboard () {
    const {dispatch, dashboard} = this.props
    const {id} = dashboard

    if (!id) {
      console.error('Cannot delete a dashboard that is not selected')

      return
    }

    dispatch(deleteDashboard(id))
    dispatch(resetDeleteDialog())
  }

  editDashboard (event) {
    const {dispatch, dashboard, editDashboardDialog} = this.props
    const {id} = dashboard
    const {subtitle, title} = editDashboardDialog

    if (!id) {
      console.error('Cannot edit a dashboard that is not selected')

      return
    }

    dispatch(editDashboard(id, subtitle, title))
    dispatch(resetEditDialog())
  }

  generateActions (cancelText, submitText, onCancelTap, onSubmitTap) {
    return [
      <FlatButton
        key={0}
        label={cancelText}
        secondary={true}
        onTouchTap={onCancelTap}
      />,
      <FlatButton
        key={1}
        label={submitText}
        primary={true}
        onTouchTap={onSubmitTap}
      />
    ]
  }

  selectDashboard (event, index, id) {
    const {dispatch, dashboards} = this.props
    const dashboard = getDashboardById(dashboards.data, id)
    const {subtitle, title} = dashboard

    dispatch(setDashboard(id, subtitle, title))
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
    const createActions = this.generateActions('Cancel', 'Create', this.hideCreateDialog, this.createDashboard)
    const deleteActions = this.generateActions('Cancel', 'Delete', this.hideDeleteDialog, this.deleteDashboard)
    const editActions = this.generateActions('Cancel', 'Save', this.hideEditDialog, this.editDashboard)

    return (
      <div>
        <header style={header}>
          <h1>Dashboards {title ? `/ ${title}` : ''}</h1>
        </header>
        <main style={main}>
          <p>{subtitle}</p>
          <SelectField
            floatingLabelText='Select a Dashboard'
            fullWidth={true}
            value={id}
            onChange={this.selectDashboard}
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
            onTouchTap={this.showEditDialog}
          />
          <FlatButton
            disabled={!id}
            label='Delete'
            onTouchTap={this.showDeleteDialog}
          />
          <FlatButton
            label='Create'
            primary={true}
            onTouchTap={this.showCreateDialog}
          />
        </main>
        {/* Dialog Definitions */}
        <Dialog
          actions={createActions}
          contentStyle={style}
          modal={false}
          open={createVisibility}
          title='Create a Dashboard'
          onRequestClose={this.hideCreateDialog}
        >
          <TextField
            floatingLabelText='Title'
            value={createTitle}
            onChange={this.changeCreateDialogTitle}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={createSubtitle}
            onChange={this.changeCreateDialogSubtitle}
          />
        </Dialog>
        <Dialog
          actions={deleteActions}
          contentStyle={style}
          modal={false}
          open={deleteVisibility}
          title='Delete a Dashboard'
          onRequestClose={this.hideDeleteDialog}
        >
          <p>Are you sure you want to delete this dashboard?</p>
        </Dialog>
        <Dialog
          actions={editActions}
          contentStyle={style}
          modal={false}
          open={editVisibility}
          title='Edit a Dashboard'
          onRequestClose={this.hideEditDialog}
        >
          <TextField
            floatingLabelText='Title'
            value={editTitle}
            onChange={this.changeEditDialogTitle}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={editSubtitle}
            onChange={this.changeEditDialogSubtitle}
          />
        </Dialog>
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