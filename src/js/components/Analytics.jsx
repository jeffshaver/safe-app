import React, {Component, PropTypes} from 'react'
import {Card, CardTitle, Paper, SelectField, TextField} from 'material-ui'

import MenuItem from 'material-ui/lib/menus/menu-item';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

class Analytics extends Component {
    constructor(props) {
      super(props);
      this.state = {value: 1};
    }
  
    render () {
       return (
         <div>
          <h2>Analytics</h2>
          <h3>Select a data source</h3>
          <SelectField 
            floatingLabelText="Select a data source" 
            hintText="Select a data source"
          >
            <MenuItem value={1} primaryText="CSV_20160102"/>
            <MenuItem value={2} primaryText="CSV_20160122"/>
          </SelectField>
          <h3>Select filter criteria (optional)</h3>
          <div>
            <SelectField 
              floatingLabelText="Select a field" 
              hintText="Select a field"
            >
              <MenuItem value={3} primaryText="Date"/>
              <MenuItem value={4} primaryText="Count"/>
            </SelectField>
            <SelectField 
              floatingLabelText="Select an operator" 
              hintText="Select an operator"
            >
              <MenuItem value={5} primaryText="="/>
              <MenuItem value={6} primaryText=">"/>
              <MenuItem value={7} primaryText=">="/>
              <MenuItem value={8} primaryText="<"/>
              <MenuItem value={9} primaryText="<="/>
            </SelectField>
            <TextField
              hintText="Filter Criteria"
              floatingLabelText="Filter Criteria"
            />              
            <FloatingActionButton mini={true} secondary={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <h3>Select an analytic</h3>
          <h3>Select a visualization</h3>
         </div>
    )}
}

export default (Analytics)