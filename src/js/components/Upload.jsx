import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import CircularProgress from 'material-ui/CircularProgress'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import DropDownMenu from 'material-ui/DropDownMenu'
import {fetchSources} from '../modules/sources'
import FileFileUpload from 'material-ui/svg-icons/file/file-upload'
import {FileInput} from 'safe-framework'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Papa from 'papaparse'
import RaisedButton from 'material-ui/RaisedButton'
import {SelectField} from './SelectField'
import TextField from 'material-ui/TextField'
import {toggleDialog} from '../modules/dialog'
import {
  clearNewSourceNameRequired,
  disableExistingSourceDataSubmit,
  disableNewSourceDataSubmit,
  disableNewSourceName,
  disableNewSourceNameSubmit,
  enableExistingSourceDataSubmit,
  enableNewSourceDataSubmit,
  enableNewSourceNameSubmit,
  resetExistingFormAction,
  resetNewFormAction,
  setExistingSourceSelected,
  setNewSourceName,
  setNewSourceNameRequired
} from '../modules/uploads'
import {createSource, resetNewSource} from '../modules/create-source'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {
  resetExistingUploadData,
  resetNewUploadData,
  sendExistingSourceData,
  sendNewSourceData,
  setExistingSourceData,
  setNewSourceData
} from '../modules/upload-data'
import {resetSource, setSource} from '../modules/source'
import {
  resetUploadDataTypes,
  setUploadDataTypeByHeaderName,
  setUploadDataTypes
} from '../modules/upload-data-types'

const getFileExtension = (fileName) =>
  // From http://stackoverflow.com/a/12900504
  fileName
    .slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)
    .toLowerCase()

class Upload extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    newSource: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired,
    uploadData: PropTypes.object.isRequired,
    uploadDataTypes: PropTypes.object.isRequired,
    uploads: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Upload'

    this.newSourceParseComplete = ::this.newSourceParseComplete
    this.newSourceParseError = ::this.newSourceParseError
    this.onChangeExistingSource = ::this.onChangeExistingSource
    this.onCreateNewSource = ::this.onCreateNewSource
    this.onExistingSourceFileChange = ::this.onExistingSourceFileChange
    this.onExistingSourceFileReject = ::this.onExistingSourceFileReject
    this.onNewSourceFileChange = ::this.onNewSourceFileChange
    this.onNewSourceFileReject = ::this.onNewSourceFileReject
    this.onNewSourceNameBlur = ::this.onNewSourceNameBlur
    this.onNewSourceNameChange = ::this.onNewSourceNameChange
    this.shouldRejectFile = ::this.shouldRejectFile
    this.submitExistingSourceData = ::this.submitExistingSourceData
    this.submitNewSourceData = ::this.submitNewSourceData

    this.state = {open: false}
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchSources())
    dispatch(resetSource())
  }

  componentWillUnmount () {
    const {dispatch} = this.props

    dispatch(resetUploadDataTypes())
    dispatch(setExistingSourceData({}))
    dispatch(setNewSourceData({}))
    dispatch(setSource(''))
    dispatch(setExistingSourceSelected(false))
  }

  shouldRejectFile (file) {
    return getFileExtension(file.name) !== 'csv'
  }
  
  existingSourceParseComplete (results, file) {
    const {dispatch} = this.props
    const headers = Object.keys(results.data[0])

    dispatch(setExistingSourceData(JSON.stringify(results.data)))
    
    if (headers.length === 0) {
      dispatch(disableNewSourceDataSubmit())
    } else {
      dispatch(enableNewSourceDataSubmit())
    }
  }

  newSourceParseComplete (results, file) {
    const {dispatch} = this.props
    const headers = Object.keys(results.data[0])
    const values = headers.map(h => results.data[0][h])
    const uploadDataTypes = {}
    
    headers.forEach((header, i) => {
      const value = values[i]

      uploadDataTypes[header] = typeof value
    })
    dispatch(setUploadDataTypes(uploadDataTypes))
    dispatch(setNewSourceData(results.data))
    
    if (headers.length === 0) {
      dispatch(disableNewSourceDataSubmit())
    } else {
      dispatch(enableNewSourceDataSubmit())
    }
  }

  newSourceParseError (error, file) {
    console.error(`Error while trying to parse file: ${file.name}`, error)
  }

  onChangeExistingSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(setExistingSourceSelected(source !== ''))
  }

  onCreateNewSource (ev) {
    const {dispatch, uploads} = this.props

    ev.preventDefault()
    dispatch(disableNewSourceName())
    dispatch(disableNewSourceNameSubmit())
    dispatch(createSource(uploads.newSourceName))
  }

  onExistingSourceFileChange (file) {
    const {dispatch} = this.props

    // Parse the csv file and save data
    dispatch(enableExistingSourceDataSubmit())
  }

  onExistingSourceFileReject (file) {
    const {dispatch} = this.props

    dispatch(disableExistingSourceDataSubmit())
    dispatch(toggleDialog(true))
  }
  
  onNewSourceFileChange (file) {
    Papa.parse(file, {
      complete: this.newSourceParseComplete,
      dynamicTyping: true,
      encoding: 'utf-8',
      error: this.newSourceParseError,
      header: true
    })
  }
  
  onNewSourceFileReject (file) {
    const {dispatch} = this.props

    dispatch(resetUploadDataTypes())
    dispatch(disableNewSourceDataSubmit())
    dispatch(toggleDialog(true))
  }

  onNewSourceNameBlur () {
    const {dispatch, uploads} = this.props

    if (uploads.newSourceName.trim() === '') {
      dispatch(setNewSourceNameRequired())
    }
  }
  
  onNewSourceNameChange (ev, value) {
    const {dispatch} = this.props
    const newSourceName = value
    
    if (newSourceName === '') {
      dispatch(disableNewSourceNameSubmit())
    } else {
      dispatch(clearNewSourceNameRequired())
      dispatch(enableNewSourceNameSubmit())
    }
    dispatch(setNewSourceName(value))
  }

  submitExistingSourceData () {
    const {dispatch, source, uploadData} = this.props
    
    dispatch(sendExistingSourceData(source, uploadData.existingSourceData))
  }
  
  submitNewSourceData () {
    // Set the sourceId
    const {dispatch, newSource, uploadData, uploadDataTypes} = this.props

    dispatch(sendNewSourceData(newSource.data._id, uploadDataTypes, uploadData.newSourceData))
  }

  handleDataTypeChange (header, value) {
    const {dispatch} = this.props

    dispatch(setUploadDataTypeByHeaderName(header, value))
  }

  renderColumnMenu (header, value) {
    return (
      <div key={header}>{header}
        <DropDownMenu
          dispatch={this.props.dispatch}
          header={header}
          value={value}
          onChange={(event, index, value) => this.handleDataTypeChange(header, value)}
        >
          {this.renderMenuItem('number')}
          {this.renderMenuItem('string')}
        </DropDownMenu>
      </div>
    )
  }

  renderMenuItem (value) {
    return (
      <MenuItem
        primaryText={value}
        value={value}
      />
    )
  }

  renderResults () {
    const {uploadDataTypes} = this.props
    const headers = Object.keys(uploadDataTypes)

    if (headers.length === 0) {
      return
    }

    return headers.map((header) => this.renderColumnMenu(header, uploadDataTypes[header]))
  }

  handleNonCsvDialogClose = () => {
    const {dispatch} = this.props

    dispatch(toggleDialog(false))
  }

  resetExistingForm = () => {
    const {dispatch} = this.props
    
    dispatch(resetExistingFormAction())
    dispatch(resetExistingUploadData())
    dispatch(resetSource())
    dispatch(fetchSources())
  }

  resetNewForm = () => {
    const {dispatch} = this.props
    
    dispatch(resetNewFormAction())
    dispatch(resetNewUploadData())
    dispatch(resetNewSource())
    dispatch(resetUploadDataTypes())
  }
  render () {
    const actions = [
      <FlatButton
        key='actionCancel'
        label='OK'
        primary={true}
        onTouchTap={this.handleNonCsvDialogClose}
      />
    ]
    const existSuccessActions = [
      <FlatButton
        key='existSuccessOk'
        label='OK'
        primary={true}
        onTouchTap={this.resetExistingForm}
      />
    ]
    const newSuccessActions = [
      <FlatButton
        key='newSuccessOk'
        label='OK'
        primary={true}
        onTouchTap={this.resetNewForm}
      />
    ]
    const {
      dialogOpen,
      source,
      sources,
      uploadData,
      uploads
    } = this.props

    return (
      <div>
        <header style={header}>
          <h1>Upload Data Set</h1>
        </header>
        <main style={main}>
          <div className='row'>
            <div className='col-xs'>
              <h2>Add Data to Existing Source</h2>
              <h3>Select Source</h3>
              <SelectField
                floatingLabelText='Select a data source'
                hintText='Select a data source'
                isFetching={sources.isFetching}
                items={sources.data}
                keyProp='_id'
                primaryTextProp='name'
                style={{}}
                value={source}
                valueProp='_id'
                onChange={this.onChangeExistingSource}
              />
              <h3>Data File</h3>
              <FileInput
                accept={'.csv'}
                disabled={!uploads.existingSourceSelected}
                shouldReject={this.shouldRejectFile}
                onChange={this.onExistingSourceFileChange}
                onReject={this.onExistingSourceFileReject}
              />
              <br />
              <RaisedButton
                disabled={uploads.existingSourceDataSubmitDisabled || uploadData.isFetchingExist}
                icon={<FileFileUpload />}
                label='Upload Data'
                labelPosition='after'
                style={{margin: '12px'}}
                onTouchTap={this.submitExistingSourceData}
              />
            </div>

            <div className='col-xs'>
              <h2>Add Data to New Source</h2>
              <h3>Source</h3>
              <TextField
                disabled={uploads.newSourceNameDisabled}
                errorText={uploads.newSourceNameErrorText}
                floatingLabelText='New Source Name'
                hintText='New Source Name'
                value={uploads.newSourceName}
                onBlur={this.onNewSourceNameBlur}
                onChange={this.onNewSourceNameChange}
              />
              <RaisedButton
                disabled={uploads.newSourceNameSubmitDisabled}
                icon={uploads.newSourceSaved ? <ActionCheckCircle /> : ''}
                label={uploads.newSourceSaved ? 'Saved' : 'Add New Source'}
                labelPosition='before'
                style={{margin: '12px'}}
                onTouchTap={this.onCreateNewSource}
              />
              <h3>Data File</h3>
              <FileInput
                accept={'.csv'}
                disabled={!uploads.newSourceSaved}
                shouldReject={this.shouldRejectFile}
                onChange={this.onNewSourceFileChange}
                onReject={this.onNewSourceFileReject}
              />
              {this.renderResults()}
              <br />
              <RaisedButton
                disabled={uploads.newSourceDataSubmitDisabled || uploadData.isFetchingNew}
                icon={<FileFileUpload />}
                label='Upload Data'
                labelPosition='after'
                style={{margin: '12px'}}
                onTouchTap={this.submitNewSourceData}
              />
            </div>
          </div>
        </main>
        <Dialog
          actions={actions}
          modal={true}
          open={dialogOpen}
        >
          Only CSV files are supported.
        </Dialog>
        <Dialog
          contentStyle={{maxWidth: 'none', textAlign: 'center', width: '15%'}}
          modal={true}
          open={uploadData.isFetchingExist || uploadData.isFetchingNew}
        >
          Uploading document...<br/>
          <CircularProgress size={0.5} />
        </Dialog>
        <Dialog
          actions={existSuccessActions}
          modal={true}
          open={uploadData.lastUpdatedExist !== null}
        >
          Data Loaded.
        </Dialog>
        <Dialog
          actions={newSuccessActions}
          modal={true}
          open={uploadData.lastUpdatedNew !== null}
        >
          Data Loaded.
        </Dialog>
      </div>
    )
  }
}

export default connect((state) => ({
  dialogOpen: state.dialog,
  newSource: state.createSource,
  source: state.source,
  sources: state.sources,
  uploadData: state.uploadData,
  uploadDataTypes: state.uploadDataTypes,
  uploads: state.uploads
}))(Upload)