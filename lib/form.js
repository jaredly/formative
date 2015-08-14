
import React from 'react'
import assign from 'object-assign'
import {fromJS} from 'immutable'

import classnames from 'classnames'
import walkChildren from './walk-children'
import formulate from './formulate'
import specToNodes from './spec-to-nodes'

const {PropTypes: PT} = React

/**
 * The main form component.
 *
 * Usage:
 * <Form initialData={{firstName: 'Juliet', age: 23}} onSubmit={cb}>
 *   <label>
 *     First Name:
 *     <input name="firstName" placeholder="e.g. Jennet"/>
 *   </label>
 *   <label>
 *     Age:
 *     <input name="age" placeholder="e.g. 34"/>
 *   </label>
 * </Form>
 */
export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: fromJS(props.initialData)
    }
  }

  static propTypes = {
    initialData: PT.object.isRequired,
    onSubmit: PT.func.isRequired,
    onChange: PT.func,
    className: PT.string,
    nested: PT.bool,
  }

  static childContextTypes = {
    formData: PT.object,
  }

  static fromSpec(config) {
    return <Form nested={config.nested} initialData={config.value} className={config.className || (config.styles ? config.styles.form : null)} onSubmit={config.onSubmit}>
      {specToNodes(config.spec, config.styles)}
      <button className={config.styles ? config.styles.submit : null} type='submit'>
        {config.buttonText}
      </button>
      {config.onCancel && <button type='button' onClick={config.onCancel}>
        {config.cancelText || 'Cancel'}
      </button>}
    </Form>
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rerender && nextProps.initialData !== this.props.initialData) {
      this.setState({data: fromJS(nextProps.initialData)})
    }
  }

  getChildContext() {
    return {formData: this.state.data}
  }

  onSubmitButton(props) {
    // TODO get name=value from props
    this.props.onSubmit(this.state.data.toJS(), props.value)
  }

  onFormSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onSubmit(this.state.data.toJS())
  }

  onChange(path, val) {
    if (path && path.length) {
      val = this.state.data.setIn(path, val)
    }
    this.setState({data: val})
    if (this.props.onChange) {
      this.props.onChange(val.toJS())
    }
  }

  makeChildren() {
    return walkChildren(
      this.props.children,
      formulate(
        this.state.data,
        this.onChange.bind(this),
        this.onSubmitButton.bind(this)
      ),
      child => (typeof child.type === 'string' || child.props.formPass)
    )
  }

  render() {
    const cls = classnames('Form', this.props.className)
    if (this.props.nested) {
      return <div className={cls}>
        {this.makeChildren()}
      </div>
    }
    return <form className={cls} onSubmit={this.onFormSubmit.bind(this)}>
      {this.makeChildren()}
    </form>
  }
}

