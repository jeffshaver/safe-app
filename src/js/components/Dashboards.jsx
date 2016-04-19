import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {header, main} from '../styles/common'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import SelectField from 'material-ui/lib/select-field'
import TextField from 'material-ui/lib/text-field'
import {
  createDashboard,
  deleteDashboard,
  editDashboard,
  fetchDashboards,
  initializeEditDialog,
  saveCreateDialog,
  saveEditDialog,
  selectDashboard,
  setCreateDialogSubtitle,
  setCreateDialogTitle,
  setCreateDialogVisibility,
  setDeleteDialogVisibility,
  setEditDialogVisibility,
  setEditDialogSubtitle,
  setEditDialogTitle
} from '../modules/dashboards'

const style = {
  width: '400px'
}

class Dashboards extends Component {
  static propTypes = {
    dashboards: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.createDashboard = ::this.createDashboard
    this.createDialogSubtitleChange = ::this.createDialogSubtitleChange
    this.createDialogTitleChange = ::this.createDialogTitleChange
    this.editDashboard = ::this.editDashboard
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchDashboards())
  }

  createDashboard = (event) => {
    const {dispatch, dashboards} = this.props

    dispatch(setCreateDialogVisibility(false))
    dispatch(saveCreateDialog())
    dispatch(createDashboard({
      title: dashboards.createDialogTitle,
      subtitle: dashboards.createDialogSubtitle
    }))
  }

  createDialogSubtitleChange = (event) => {
    const {dispatch} = this.props

    dispatch(setCreateDialogSubtitle(event.target.value))
  }

  createDialogTitleChange = (event) => {
    const {dispatch} = this.props

    dispatch(setCreateDialogTitle(event.target.value))
  }

  createDialogVisibility = (visible) => {
    const {dispatch} = this.props

    dispatch(setCreateDialogVisibility(visible))
  }

  dashboardSelectChange = (event, index, id) => {
    const {dispatch} = this.props

    dispatch(selectDashboard(id))
  }

  deleteDashboard = (event) => {
    const {dispatch, dashboards} = this.props
    const {selectedDashboardId: id} = dashboards

    dispatch(setDeleteDialogVisibility(false))

    if (!id) {
      console.error('Cannot delete a dashboard that is not selected')

      return
    }

    dispatch(deleteDashboard(id))
  }

  deleteDialogVisibility = (visible) => {
    const {dispatch} = this.props

    dispatch(setDeleteDialogVisibility(visible))
  }

  editDashboard = (event) => {
    const {dispatch, dashboards} = this.props
    const {
      editDialogSubtitle: subtitle,
      editDialogTitle: title,
      selectedDashboardId: id
    } = dashboards

    dispatch(setEditDialogVisibility(false))

    // CANNOT SAVE A DASHBOARD THAT IS NOT SELECTED
    if (dashboards.selectedDashboardId) {
      dispatch(saveEditDialog())
      dispatch(editDashboard({
        id,
        subtitle,
        title
      }))
    }
  }

  editDialogSubtitleChange = (event) => {
    const {dispatch} = this.props

    dispatch(setEditDialogSubtitle(event.target.value))
  }

  editDialogTitleChange = (event) => {
    const {dispatch} = this.props

    dispatch(setEditDialogTitle(event.target.value))
  }

  editDialogVisibility = (visible) => {
    const {dispatch} = this.props

    if (visible) {
      dispatch(initializeEditDialog())
    }

    dispatch(setEditDialogVisibility(visible))
  }

  render () {
    const {
      dashboards
    } = this.props

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
          open={dashboards.createDialogVisibility}
          title='Create a Dashboard'
          onRequestClose={() => (this.createDialogVisibility(false))}
        >
          <TextField
            floatingLabelText='Title'
            value={dashboards.createDialogTitle}
            onChange={this.createDialogTitleChange}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={dashboards.createDialogSubtitle}
            onChange={this.createDialogSubtitleChange}
          />
        </Dialog>
        <Dialog
          actions={deleteActions}
          contentStyle={style}
          modal={false}
          open={dashboards.deleteDialogVisibility}
          title='Delete a Dashboard'
          onRequestClose={() => (this.deleteDialogVisibility(false))}
        >
          <p>Are you sure you want to delete this dashboard?</p>
        </Dialog>
        <Dialog
          actions={editActions}
          contentStyle={style}
          modal={false}
          open={dashboards.editDialogVisibility}
          title='Edit a Dashboard'
          onRequestClose={() => (this.editDialogVisibility(false))}
        >
          <TextField
            floatingLabelText='Title'
            value={dashboards.editDialogTitle}
            onChange={this.editDialogTitleChange}
          />
          <TextField
            floatingLabelText='Subtitle'
            value={dashboards.editDialogSubtitle}
            onChange={this.editDialogSubtitleChange}
          />
        </Dialog>
        <header style={header}>
          <h1>Dashboards {dashboards.title ? `/ ${dashboards.title}` : ''}</h1>
        </header>
        <main style={main}>
          <p>{dashboards.subtitle}</p>
          <SelectField
            floatingLabelText='Select a Dashboard'
            fullWidth={true}
            value={dashboards.selectedDashboardId}
            onChange={this.dashboardSelectChange}
          >
            {dashboards.dashboards.data.map(function (result) {
              return (
                <MenuItem
                  key={result._id}
                  primaryText={result.title}
                  value={result._id}
                />
              )
            })}
          </SelectField>

          <FlatButton
            disabled={!dashboards.selectedDashboardId}
            label='Edit'
            onTouchTap={() => (this.editDialogVisibility(true))}
          />
          <FlatButton
            disabled={!dashboards.selectedDashboardId}
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
  dashboards: state.dashboards
}))(Dashboards)