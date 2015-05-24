
import React from 'react'
import classnames from 'classnames'

import mmSS from './mmSS'
import ago from './ago'

export default class Ticker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dur: Date.now() - props.start}
    this._ival = setInterval(_ => {
      this.setState({dur: Date.now() - this.props.start})
    }, props.ago ? (10 * 1000) : 83)
  }

  componentWillUnmount() {
    clearInterval(this._ival)
  }

  render() {
    return <span className={classnames('Ticker', this.props.className)}>{this.props.ago ? ago(this.props.start) : mmSS(this.state.dur)}</span>
  }
}

