import React from 'react'
import assign from 'object-assign'
import {fromJS} from 'immutable'

import classnames from 'classnames'
import walkChildren from './walk-children'
import formulate from './formulate'
import specToNodes from './spec-to-nodes'
import specToDefaults from './spec-to-defaults'

const {PropTypes: PT}= React

export default class FormSection extends React.Component {
  /**
   * Create from a specification. Options:
   * {
   *   // need either `name` or both `value` and `onChange`
   *   name: 'the form value name',
   *   value: (immutable structure)
   *   onChange: func,
   *
   *   className: string?,
   *   spec: object describing shape of data
   *
   *   extraProps: {}
   * }
   */
  static fromSpec(config) {
    const extra = config.extraProps || {}
    return <FormSection name={config.name} value={config.value}
        className={config.className || (config.styles ? config.styles.form : null)}
        defaultData={config.defaultData || specToDefaults(config.spec)}
        onChange={config.onChange} {...extra}>
      {specToNodes(config.spec, config.styles)}
    </FormSection>
  }

  static propTypes = {
    defaultData: PT.object,
    children: PT.node,
    value: PT.object.isRequired,
    onChange: PT.func.isRequired,
    onSubmit: PT.func,
  }

  onChange(path, val) {
    const value = this.props.value || fromJS(this.props.defaultData || {})
    this.props.onChange(value.setIn(path, val))
  }

  makeChildren() {
    return walkChildren(
      this.props.children,
      formulate(
        this.props.value || fromJS(this.props.defaultData || {}),
        this.onChange.bind(this),
        this.props.onSubmit),
      child => (typeof child.type === 'string' || child.props.formPass)
    )
  }

  render() {
    return <div className={classnames('FormSection', this.props.className)}>
      {this.makeChildren()}
    </div>
  }
}

