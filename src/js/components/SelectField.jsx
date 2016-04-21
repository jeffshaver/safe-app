import {SelectField as MaterialSelectField, MenuItem} from 'material-ui'
import React, {Component, PropTypes} from 'react'

export class SelectField extends Component {
  static propTypes = {
    errorText: PropTypes.node,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {},
    floatingLabelText: 'Select a field',
    hintText: 'Select a field'
  }

  render () {
    const {
      errorText,
      floatingLabelText,
      hintText,
      items,
      style,
      value,
      onChange
    } = this.props

    return (
      <MaterialSelectField
        errorText={errorText}
        floatingLabelText={floatingLabelText}
        hintText={hintText}
        items={items}
        style={style}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            primaryText={item.primaryText}
            value={item.primaryText}
          />
        ))}
      </MaterialSelectField>
    )
  }
}