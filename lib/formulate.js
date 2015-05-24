
export default function formulate(data, setter, submitter) {
  return function (props, type) {
    if (type === 'button') {
      if (props.onClick) return null
      return {
        onClick: e => {
          e.preventDefault()
          e.stopPropagation()
          submitter(props)
        }
      }
    }
    if (undefined === props.name) return null
    const isInput = type === 'input'
    const isCheckbox = isInput && props.type === 'checkbox'
    const isRadio = isInput && props.type === 'radio'
    if (typeof type === 'string' && !isInput && type !== 'textarea') {
      return null
    }
    const parts = (props.name === '' || props.name === '*') ? [] : props.name.split('.')
    const val = parts.reduce((obj, attr) => {
      if (!obj) return null
      return obj.get(attr)
    }, data)

    const cb = e => {
      if (isRadio && !e.target.checked) return
      let val
      if (isCheckbox) val = e.target.checked
      else if (isRadio) val = props.value
      else if (isInput || type === 'textarea') val = e.target.value
      else val = e

      setter(parts, val)
    }

    const nextProps = {
      onChange: cb,
    }

    if (isCheckbox) {
      nextProps.checked = val
    } else if (isRadio) {
      nextProps.checked = val === props.value
    } else {
      nextProps.value = val
    }

    if (typeof type !== 'string') {
      nextProps.onSubmit = submitter
    }

    return nextProps
  }
}

