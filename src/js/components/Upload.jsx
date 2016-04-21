import {connect} from 'react-redux'
import {FileInput} from 'safe-framework'
import Papa from 'papaparse'
import {toggleDialog} from '../modules/dialog'
import {Dialog, DropDownMenu, FlatButton, MenuItem} from 'material-ui'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {
  resetUploadDataTypes,
  setUploadDataTypeByHeaderName,
  setUploadDataTypes
} from '../modules/upload'

const getFileExtension = (fileName) =>
  // From http://stackoverflow.com/a/12900504
  fileName
    .slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)
    .toLowerCase()

class Upload extends Component {
  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    uploadDataTypes: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.parseComplete = ::this.parseComplete
    this.parseError = ::this.parseError
    this.shouldRejectFile = ::this.shouldRejectFile
    this.onFileChange = ::this.onFileChange
    this.onFileReject = ::this.onFileReject

    this.state = {open: false}
  }

  componentWillUnmount () {
    const {dispatch} = this.props

    dispatch(resetUploadDataTypes())
  }

  shouldRejectFile (file) {
    return getFileExtension(file.name) !== 'csv'
  }

  onFileReject (file) {
    const {dispatch} = this.props

    dispatch(resetUploadDataTypes())
    dispatch(toggleDialog(true))
  }

  onFileChange (file) {
    Papa.parse(file, {
      complete: this.parseComplete,
      dynamicTyping: true,
      encoding: 'utf-8',
      error: this.parseError,
      preview: 2
    })
  }

  parseComplete (results, file) {
    const {dispatch} = this.props
    const headers = results.data[0]
    const values = results.data[1]
    const uploadDataTypes = {}

    headers.forEach((header, i) => {
      const value = values[i]

      uploadDataTypes[header] = typeof value
    })
    dispatch(setUploadDataTypes(uploadDataTypes))
  }

  parseError (error, file) {
    console.error(`Error while trying to parse file: ${file.name}`, error)
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

  render () {
    const actions = [
      <FlatButton
        key='actionCancel'
        label='OK'
        primary={true}
        onTouchTap={this.handleNonCsvDialogClose}
      />
    ]
    const {dialogOpen} = this.props

    return (
      <div>
        <header style={header}>
          <h1>Data</h1>
        </header>
        <main style={main}>
          <h3>Upload a Dataset</h3>
          <FileInput
            accept={'.csv'}
            shouldReject={this.shouldRejectFile}
            onChange={this.onFileChange}
            onReject={this.onFileReject}
          />
          {this.renderResults()}
        </main>
        <Dialog
          actions={actions}
          modal={true}
          open={dialogOpen}
        >
          Only CSV files are supported.
        </Dialog>
      </div>
    )
  }
}

export default connect((state) => ({
  uploadDataTypes: state.uploadDataTypes,
  dialogOpen: state.dialog
}))(Upload)