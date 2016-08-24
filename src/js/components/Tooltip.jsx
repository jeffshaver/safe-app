import MaterialTooltip from 'material-ui/internal/Tooltip'
import React, {Component, PropTypes} from 'react'

export default class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.array,
    className: PropTypes.string,
    horizontalPosition: PropTypes.string,
    label: PropTypes.node.isRequired,
    style: PropTypes.object,
    touch: PropTypes.bool,
    verticalPosition: PropTypes.string
  }
  
  static defaultProps = {
    horizontalPosition: 'center',
    touch: true,
    verticalPosition: 'bottom'
  }
  
  constructor (props) {
    super(props)
    
    this.state = {showTooltip: false}

    this.handleBlur = ::this.handleBlur
    this.handleFocus = ::this.handleFocus
    this.handleMouseLeave = ::this.handleMouseLeave
    this.handleMouseEnter = ::this.handleMouseEnter
  }
  
  hideTooltip () {
    this.setState({showTooltip: false})
  }
  
  showTooltip () {
    this.setState({showTooltip: true})
  }
  
  handleBlur (event) {
    this.hideTooltip()
  }

  handleFocus (event) {
    this.showTooltip()
  }
  
  handleMouseLeave (event) {
    this.hideTooltip()
  }

  handleMouseEnter (event) {
    this.showTooltip()
  }

  render () {
    const {
      children,
      className,
      horizontalPosition,
      label,
      style,
      touch,
      verticalPosition
    } = this.props
    const {showTooltip} = this.state

    return (
      <span
        style={{position: 'relative', display: 'inline-block'}}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
        <MaterialTooltip
          className={className}
          horizontalPosition={horizontalPosition}
          label={label}
          show={showTooltip}
          style={style}
          touch={touch}
          verticalPosition={verticalPosition}
        />
      </span>
    )
  }
}