import React from 'react'

export default (props) => (
  <em style={{
    color: props.color ? props.color : '#FFF',
    textShadow: `${props.color ? props.color : '#FFF'} 0 0 10px`
  }}>
    {props.children}
  </em>
)
