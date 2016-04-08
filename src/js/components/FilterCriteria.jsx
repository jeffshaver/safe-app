import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import {FloatingActionButton, MenuItem, SelectField, TextField} from 'material-ui'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

class FilterCriteria extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    filters: PropTypes.instanceOf(Immutable.List),
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
    onAdd: PropTypes.func.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onChangeOperator: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired
  }

  static defaultProps = {
    style: {},
    wrapperStyle: {}
  }

  render () {
    const {
      fields,
      filters,
      style,
      wrapperStyle,
      onAdd,
      onChangeField,
      onChangeOperator,
      onChangeValue
    } = this.props

    return (
      <div style={wrapperStyle}>
        <h3>Select filter criteria (optional)</h3>
        {
          filters.map((filter, i) => (
            <div key={i}>
              <SelectField
                floatingLabelText='Select a field'
                hintText='Select a field'
                style={style}
                value={filter.get('field')}
                onChange={(ev, index, value) => onChangeField(i, value)}
              >
                {
                  fields.get('data').map((field) => (
                    <MenuItem
                      key={field.get('_id')}
                      primaryText={field.get('name')}
                      value={field.get('_id')}
                    />
                  ))
                }
              </SelectField>
              <SelectField
                floatingLabelText='Select an operator'
                hintText='Select an operator'
                style={style}
                value={filter.get('operator')}
                onChange={(ev, index, value) => onChangeOperator(i, value)}
              >
                <MenuItem
                  primaryText='='
                  value={'='}
                />
                <MenuItem
                  primaryText='>'
                  value={'>'}
                />
                <MenuItem
                  primaryText='>='
                  value={'>='}
                />
                <MenuItem
                  primaryText='<'
                  value={'<'}
                />
                <MenuItem
                  primaryText='<='
                  value={'<='}
                />
              </SelectField>
              <TextField
                floatingLabelText='Filter Criteria'
                hintText='Filter Criteria'
                style={style}
                value={filter.get('value')}
                onChange={(ev) => onChangeValue(i, ev.target.value)}
              />
              {(() => {
                if (i === filters.count() - 1) {
                  return (
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      onTouchTap={onAdd}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                  )
                }
              })()}
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect((state) => ({
  fields: state.fields,
  filters: state.filters
}))(FilterCriteria)