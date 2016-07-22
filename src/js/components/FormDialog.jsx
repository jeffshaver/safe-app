import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'
import React, {Component, PropTypes} from 'react'

export class FormDialog extends Component {
  static propTypes = {
    cancelButton: PropTypes.object,
    cancelButtonText: PropTypes.string,
    children: PropTypes.array,
    formItems: PropTypes.array,
    formOptions: PropTypes.object,
    open: PropTypes.bool,
    options: PropTypes.object,
    style: PropTypes.object,
    submitButton: PropTypes.object,
    submitButtonText: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onSubmitClick: PropTypes.func
  }
  
  static defaultProps = {
    cancelButton: {},
    cancelButtonText: 'Cancel',
    options: {},
    title: '',
    formItems: [],
    formOptions: {},
    style: {},
    submitButton: {},
    submitButtonText: 'Submit',
    onClose: () => {},
    onSubmitClick: () => {}
  }

  constructor (props) {
    super(props)
    
    const {open} = this.props

    this.state = {
      open,
      submitButtonEnabled: true
    }

    this.disableSubmitButton = ::this.disableSubmitButton
    this.enableSubmitButton = ::this.enableSubmitButton
    this.hideDialog = ::this.closeClick
    this.submitClick = ::this.submitClick
  }
  
  componentWillReceiveProps (nextProps) {
    const {open} = nextProps
    
    this.changeOpen(open)
  }
  
  changeOpen (open) {
    if (this.state.open !== open) {
      this.setState({open})
    }
  }
  
  disableSubmitButton () {
    this.setState({
      submitButtonEnabled: false
    })
  }
  
  enableSubmitButton () {
    this.setState({
      submitButtonEnabled: true
    })
  }
  
  closeClick () {
    const {onClose} = this.props
    
    this.changeOpen(false)
    onClose()
  }
  
  submitClick (values) {
    const {onClose, onSubmitClick} = this.props
    
    this.changeOpen(false)
    onSubmitClick(values)
    onClose()
  }
  
  renderActions () {
    const {
      cancelButton,
      cancelButtonText,
      submitButton,
      submitButtonText
    } = this.props
    const {submitButtonEnabled} = this.state
    
    return [
      <FlatButton
        key={0}
        label={cancelButtonText}
        secondary={true}
        onTouchTap={this.hideDialog}
        {...cancelButton}
      />,
      <FlatButton
        disabled={!submitButtonEnabled}
        key={1}
        label={submitButtonText}
        primary={true}
        onTouchTap={() => {this._form.submit()}}
        {...submitButton}
      />
    ]
  }

  render () {
    const {
      children,
      formOptions,
      options,
      style,
      title,
      onClose
    } = this.props
    const {open} = this.state

    return (
      <Dialog
        actions={this.renderActions()}
        contentStyle={style}
        modal={false}
        open={open}
        title={title}
        onRequestClose={onClose}
        {...options}
      >
        <Formsy.Form
          ref={(form) => {this._form = form}}
          onInvalid={this.disableSubmitButton}
          onSubmit={this.submitClick}
          onValid={this.enableSubmitButton}
          {...formOptions}
        >
          {children}
        </Formsy.Form>
      </Dialog>
    )
  }
}