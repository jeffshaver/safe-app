import numeral from 'numeral'
import React, {Component, PropTypes} from 'react'

const style = {
  flexColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  flexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
  }
}

export class SummaryComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render () {
    const {data} = this.props

    return (
      <div
        ref={(ref) => (this._component = ref)}
        style={style.flexColumn}
      >
        <div style={style.flexWrapper}>
          {
            data.map((item, i) => {
              const key = Object.keys(item)[0]

              return (
                <div key={i}>
                  <h2>
                    {numeral(item[key]).format('0,0')}
                   </h2>
                  <h4>
                    {key}
                  </h4>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}