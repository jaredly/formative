
import React from 'react/addons'

export default function walkChildren(children, newProps, crawlIn) {
  return React.Children.map(children, child => {
    if (!child || typeof child === 'string') return child
    const children = crawlIn(child) ? walkChildren(child.props.children, newProps, crawlIn) : child.props.children
    const nProps = newProps(child.props, child.type) || {}
    nProps.children = children
    return React.addons.cloneWithProps(child, nProps)
    // Use this when 0.14 comes out
    // return React.cloneElement(child, newProps(child.props, child.type), children)
  })
}

