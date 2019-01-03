import React from 'react'
import theme from 'utilities/theme'
import H from './Text_Highlight'


export default (props) => (
  <H color={theme.danger} {...props}>
    {props.children}
  </H>
)
