import AddIcon from 'material-ui/svg-icons/content/add'
import AddVizIcon from 'material-ui/svg-icons/av/playlist-add'
import {applicationName} from '../../../config'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dashboard from './Dashboard'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import {fetchVisualizations} from '../modules/visualizations'
import {FormDialog} from './FormDialog'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import {LogMetrics} from '../decorators'
import MenuItem from 'material-ui/MenuItem'
import SaveIcon from 'material-ui/svg-icons/content/save'
import {SelectField} from 'safe-framework/lib/hacks/SelectField'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import UndoIcon from 'material-ui/svg-icons/content/undo'
import {
  addDashboard,
  fetchDashboardGroups,
  removeDashboard
} from '../modules/dashboard-groups'
import {
  createDashboard,
  deleteDashboard,
  editDashboard,
  revertDashboard
} from '../modules/dashboard'
import {FormsySelect, FormsyText} from 'formsy-material-ui/lib'
import {getDashboardById, getDashboardsFromGroups} from '../constants'
import {header, headerAppName, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'

const style = {
  button: {
    marginTop: 'auto'
  },
  content: {
    width: '400px'
  },
  dialog: {
    width: '400px'
  },
  h1: {
    margin: 0
  }
}

@LogMetrics('Dashboards')
class Dashboards extends Component {
  static propTypes = {
    dashboardGroups: PropTypes.object.isRequired,
    dashboardId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    visualizations: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      createVisibility: false,
      dashboardLayout: [],
      deleteVisibility: false,
      editVisibility: false
    }

    this.displayName = 'Dashboards'

    this.addVisualization = ::this.addVisualization
    this.createDashboard = ::this.createDashboard
    this.deleteDashboard = ::this.deleteDashboard
    this.editDashboard = ::this.editDashboard
    this.revertDashboard = ::this.revertDashboard
    this.selectDashboard = ::this.selectDashboard
    this.saveDashboard = ::this.saveDashboard
    this.hideCreateDialog = this.changeState.bind(this, 'createVisibility', false)
    this.showCreateDialog = this.changeState.bind(this, 'createVisibility', true)
    this.hideEditDialog = this.changeState.bind(this, 'editVisibility', false)
    this.showEditDialog = this.changeState.bind(this, 'editVisibility', true)
    this.hideDeleteDialog = this.changeState.bind(this, 'deleteVisibility', false)
    this.showDeleteDialog = this.changeState.bind(this, 'deleteVisibility', true)
    this.onLayoutChange = ::this.onLayoutChange
  }

  fetchDashboardsIfNeeded () {
    const {dashboardGroups, dispatch} = this.props

    if (!dashboardGroups.error && (dashboardGroups.isFetching || dashboardGroups.data.length !== 0)) {
      return
    }

    dispatch(fetchDashboardGroups())
  }

  componentWillMount () {
    const {dispatch} = this.props

    this.fetchDashboardsIfNeeded()
    dispatch(fetchVisualizations())
  }

  componentWillUpdate () {
    this.fetchDashboardsIfNeeded()
  }

  getCurrentDashboard () {
    const {
      dashboardId = '',
      dashboardGroups
    } = this.props
    const dashboards = getDashboardsFromGroups(dashboardGroups)

    return getDashboardById(dashboards, dashboardId) || {}
  }

  addVisualization (visualization) {
    const {dispatch} = this.props
    const dashboard = this.getCurrentDashboard()
    const {dashboardParams = {}, visualizations = []} = dashboard
    const {visualizationSizes = {}} = dashboardParams
    const {_id: vizId} = visualization

    visualizations.push(visualization)

    dashboard.visualizations = visualizations
    dashboardParams.visualizationSizes = {
      ...visualizationSizes,
      [vizId]: {
        h: 2,
        w: 1,
        i: vizId
      }
    }

    dashboard.dashboardParams = dashboardParams

    dispatch(addDashboard(dashboard))
  }

  changeState (property, value) {
    this.setState({[property]: value})
  }

  createDashboard (fields) {
    const {dispatch} = this.props

    dispatch(createDashboard(fields, (json) => {
      dispatch(addDashboard(json))
      browserHistory.push(`/dashboards/${json._id}`)
    }))
  }

  deleteDashboard () {
    const {dashboardId, dispatch} = this.props

    if (!dashboardId) {
      console.error('Cannot delete a dashboard that is not selected')

      return
    }

    dispatch(deleteDashboard(dashboardId, (json) => {
      dispatch(removeDashboard(dashboardId))
      browserHistory.push('/dashboards/')
    }))
  }

  editDashboard (fields = {}) {
    const {
      dashboardId = '',
      dispatch
    } = this.props
    const {dashboardLayout: layouts} = this.state
    const currentDashboard = this.getCurrentDashboard() || {}
    let {dashboardParams = {}} = currentDashboard

    if (!dashboardId) {
      console.error('Cannot edit a dashboard that is not selected')

      return
    }

    const visualizationSizes = layouts.reduce((object, value) => {
      object[value.i] = {
        ...value
      }

      return object
    }, {})

    dashboardParams = {
      ...dashboardParams,
      visualizationSizes
    }

    dispatch(editDashboard({
      ...currentDashboard,
      ...fields,
      dashboardParams
    }, (json) => {
      dispatch(addDashboard(json))
    }))
  }

  revertDashboard () {
    const {dashboardId = '', dispatch} = this.props

    dispatch(revertDashboard(dashboardId, (json) => {
      dispatch(addDashboard(json))
    }))
  }

  saveDashboard () {
    this.editDashboard()
  }

  enableSubmitButton () {
    this.setState({
      submitButtonEnabled: true
    })
  }

  disableSubmitButton () {
    this.setState({
      submitButtonEnabled: false
    })
  }

  onLayoutChange (dashboardLayout) {
    this.setState({dashboardLayout})
  }

  renderDashboardFormItems (currentDashboard = {}) {
    const {dashboardGroups} = this.props
    const {group, title, subtitle} = currentDashboard
    const sortedGroups = (dashboardGroups.data || []).sort((a, b) => (
      a.title.localeCompare(b.title)
    ))

    return [
      <FormsyText
        floatingLabelText="Title"
        key='titleText'
        name="title"
        required
        value={title}
      />,
      <FormsyText
        floatingLabelText="Subtitle (optional)"
        key='subtitleText'
        name="subtitle"
        value={subtitle}
      />,
      <FormsySelect
        floatingLabelText="Group"
        key="group"
        name="group"
        required
        value={group}
      >
        {sortedGroups.map((group) => (
          <MenuItem
            key={group._id}
            primaryText={group.title}
            value={group._id}
          />
        ))}
      </FormsySelect>
    ]
  }

  renderCrudDialogs () {
    const currentDashboard = this.getCurrentDashboard() || {}
    const {title} = currentDashboard
    const {
      createVisibility,
      deleteVisibility,
      editVisibility
    } = this.state

    return (
      <div>
        <FormDialog
          open={createVisibility}
          style={style.dialog}
          submitButtonText='Create'
          title='Create a Dashboard'
          onClose={this.hideCreateDialog}
          onSubmitClick={this.createDashboard}
        >
          {this.renderDashboardFormItems()}
        </FormDialog>
        <FormDialog
          cancelButtonText='No'
          open={deleteVisibility}
          style={style.dialog}
          submitButtonText='Yes'
          title={`Delete ${title}?`}
          onClose={this.hideDeleteDialog}
          onSubmitClick={this.deleteDashboard}
        >
          {[<p key={'delete'}>Are you sure you want to delete this dashboard?</p>]}
        </FormDialog>
        <FormDialog
          open={editVisibility}
          style={style.dialog}
          submitButtonText='Edit'
          title={`Edit ${title}`}
          onClose={this.hideEditDialog}
          onSubmitClick={this.editDashboard}
        >
          {this.renderDashboardFormItems(currentDashboard)}
        </FormDialog>
      </div>
    )
  }

  renderDashboardIcons () {
    const {
      dashboardId = '',
      visualizations: allVisualizations
    } = this.props
    const dashboard = this.getCurrentDashboard() || {}
    const {visualizations: dashboardVisualizations = []} = dashboard

    const usedVizIds = dashboardVisualizations.map(v => v._id)
    const unusedVisualizations = allVisualizations.data.filter(function (currViz) {
      return !usedVizIds.includes(currViz._id)
    })

    return (
      <ToolbarGroup style={style.button}>
        <IconButton
          tooltip="Create Dashboard"
          onClick={this.showCreateDialog}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          disabled={!dashboardId}
          tooltip="Edit Dashboard"
          onClick={this.showEditDialog}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          disabled={!dashboardId}
          tooltip="Save Dashboard"
          onClick={this.saveDashboard}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          disabled={!dashboardId}
          tooltip="Revert Dashboard"
          onClick={this.revertDashboard}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          disabled={!dashboardId}
          tooltip="Delete Dashboard"
          onClick={this.showDeleteDialog}
        >
          <DeleteIcon />
        </IconButton>
        <IconMenu
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          iconButtonElement={
            <IconButton
              disabled={!dashboardId}
              tooltip='Add Visualization'
            >
              <AddVizIcon />
            </IconButton>
          }
          style={{
            ...style.button,
            textAlign: 'right'
          }}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onItemTouchTap={(e, m, i) => {this.addVisualization(m.props.value)}}
        >
          {
            unusedVisualizations.length > 0
            ? (
              unusedVisualizations.map((viz, i) => (
                <MenuItem
                  key={i}
                  primaryText={viz.name}
                  value={viz}
                />
              ))
            )
            : (
              <MenuItem
                disabled={true}
                primaryText='No visualizations available'
              />
            )
          }
        </IconMenu>
      </ToolbarGroup>
    )
  }

  selectDashboard (event, index, id) {
    browserHistory.push(`/dashboards/${id}`)
  }

  render () {
    const {
      dashboardGroups,
      dashboardId = ''
    } = this.props
    const dashboard = this.getCurrentDashboard()
    const {title} = dashboard || {}

    return (
      <div>
        <header style={header}>
          <p style={headerAppName}>{applicationName}</p>
          <h1 style={style.h1}>Dashboards {title ? `/ ${title}` : ''}</h1>
        </header>
        <main style={main}>
          <Toolbar
            style={{
              backgroundColor: 'transparent',
              height: '72px'
            }}
          >
            <ToolbarGroup firstChild={true}>
              <SelectField
                autoWidth={true}
                childProp='dashboards'
                floatingLabelText='Select a dashboard'
                hintText='Select a dashboard'
                isFetching={dashboardGroups.isFetching}
                items={(dashboardGroups.data || []).sort((a, b) => (
                  a.title.localeCompare(b.title)
                ))}
                keyProp={'_id'}
                primaryTextProp={'title'}
                value={dashboardId}
                valueProp={'_id'}
                onChange={this.selectDashboard}
              />
            </ToolbarGroup>
            {/* this.renderDashboardIcons() */}
          </Toolbar>
          {(() => {
            if (!dashboardId || dashboardGroups.data.length === 0 || dashboardGroups.isFetching || dashboardGroups.error) {
              return null
            }

            return (
              <Dashboard
                dashboard={dashboard}
                dashboardId={dashboardId}
                gridOptions={{
                  onLayoutChange: this.onLayoutChange
                }}
                key={dashboardId}
              />
            )
          })()}
        </main>
        {this.renderCrudDialogs()}
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  dashboardId: ownProps.params
    ? ownProps.params.dashboardId
    : '',
  dashboardGroups: state.dashboardGroups,
  visualizations: state.visualizations
}))(Dashboards)