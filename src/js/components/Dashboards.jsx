import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {createDashboard} from '../modules/create-dashboard'
import Dashboard from './Dashboard'
import {deleteDashboard} from '../modules/delete-dashboard'
import Dialog from 'material-ui/Dialog'
import {editDashboard} from '../modules/edit-dashboard'
import {fetchDashboards} from '../modules/dashboards'
import FlatButton from 'material-ui/FlatButton'
import {getDashboardById} from '../constants'
import {SelectField} from './SelectField'
import TextField from 'material-ui/TextField'
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
import {Hydrateable, LogMetrics} from '../decorators'
import React, {Component, PropTypes} from 'react'

const style = {
  width: '400px'
}

@LogMetrics('pageView', 'Dashboards')
@Hydrateable('Dashboards', ['filters'])
class Dashboards extends Component {
  static propTypes = {
    createDashboardDialog: PropTypes.object.isRequired,
    dashboardId: PropTypes.string,
    dashboards: PropTypes.object.isRequired,
    deleteDashboardDialog: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    editDashboardDialog: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Dashboards'

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
    const {dashboardId, dashboards, dispatch} = this.props
    const dashboard = getDashboardById(dashboards.data, dashboardId)
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
    const {dashboardId, dispatch} = this.props

    if (!dashboardId) {
      console.error('Cannot delete a dashboard that is not selected')

      return
    }

    dispatch(deleteDashboard(dashboardId))
    dispatch(resetDeleteDialog())
  }

  editDashboard (event) {
    const {dashboardId, dispatch, editDashboardDialog} = this.props
    const {subtitle, title} = editDashboardDialog

    if (!dashboardId) {
      console.error('Cannot edit a dashboard that is not selected')

      return
    }

    dispatch(editDashboard(dashboardId, subtitle, title))
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
    browserHistory.push(`/dashboards/${id}`)
  }
  
  render () {
    const {
      createDashboardDialog,
      dashboardId = '',
      dashboards,
      deleteDashboardDialog,
      editDashboardDialog
    } = this.props
    const dashboard = getDashboardById(dashboards.data, dashboardId)
    const {title} = dashboard || {}
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
          <SelectField
            autoWidth={true}
            floatingLabelText='Select a dashboard'
            hintText='Select a dashboard'
            isFetching={dashboards.isFetching}
            items={(dashboards.data || []).sort((a, b) => (
              a.title.localeCompare(b.title)
            ))}
            keyProp={'_id'}
            primaryTextProp={'title'}
            value={dashboardId}
            valueProp={'_id'}
            onChange={this.selectDashboard}
          />
          {/* <FlatButton
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
          /> */}
          {(() => {
            if (!dashboardId || dashboards.data.length === 0 || dashboards.isFetching || dashboards.error) {
              return null
            }

            return (
              <Dashboard
                dashboard={dashboard}
              />
            )
          })()}
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

export default connect((state, ownProps) => ({
  createDashboardDialog: state.createDashboardDialog,
  dashboardId: ownProps.params
    ? ownProps.params.dashboardId
    : '',
  dashboards: state.dashboards,
  deleteDashboardDialog: state.deleteDashboardDialog,
  editDashboardDialog: state.editDashboardDialog
}))(Dashboards)