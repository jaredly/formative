
import React from 'react'
import classnames from 'classnames'

export default class Panes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selected: this.props.defaultPane || 0}
  }

  getCurrentPane() {
    let selected = null
    React.Children.forEach(this.props.children, child => {
      if (child && child.props && child.props.paneId === this.state.selected) selected = child
    })
    return selected
  }

  onSelect(id) {
    this.setState({selected: id})
  }

  render() {
    const ids = Object.keys(this.props.panes)
    return <div className={classnames('Panes', this.props.className)}>
      <ul className='Panes_nav'>
        {ids.map(id => <li className={
          classnames('Button Panes_nav_item', id === this.state.selected && 'Panes_nav_item-selected')
        } key={id} onClick={() => this.onSelect(id)}>
          {this.props.panes[id]}
        </li>)}
        {this.props.extraTop ? <li className='Panes_extra_top'>{this.props.extraTop}</li> : null}
      </ul>
      {this.getCurrentPane()}
    </div>
  }
}

