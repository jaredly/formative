
import React from 'react'
import FormSection from './form-section'
import Radio from './radio'
import specToDefaults from './spec-to-defaults'

export default function specToNodes(spec, styles) {
  styles = styles || {}
  const children = []
  for (let name in spec) {
    let val = spec[name]
    if (typeof val === 'string') {
      val = {title: val, type: val}
    }
    if (val.type === 'section') {
      children.push(<FormSection className={styles.section}
                      key={name} name={name}>
        <div className='form-section_title'>{val.title}</div>
        {specToNodes(val.spec, styles)}
      </FormSection>)
    } else if (val.type === 'union') {
      children.push(unionToRadio(name, val))
    } else {
      children.push(<label
                      key={name}
                      className={styles[val.type + 'Label'] || val.type + '-label'}>
        {val.title}
        {val.type === 'text' && val.multiline ?
          <textarea
            className={styles[val.type]}
            name={name}/> :
          <input
            className={styles[val.type]}
            type={val.type}
            name={name}/>}
      </label>)
    }
  }
  return children
}

function unionToRadio(groupName, val) {

  const children = []
  const defaults = {}
  Object.keys(val.options).forEach(name => {
    defaults[name] = specToDefaults(val.options[name])
    children.push(FormSection.fromSpec({
      name: '*',
      spec: val.options[name],
      extraProps: {
        switchWhere: name,
      },
    }))
  })

  return <Radio
    title={val.title || groupName}
    name={groupName}
    choices={val.optionTitles}
    switchOn={val.test}
    defaultData={defaults}
    children={children}/>
}

