import React from 'react'
import styled from 'styled-components'
import theme from 'utilities/theme'

const Highlight = styled.em`
  ${props => theme.colorizeText(props.color ? props.color : '#fff')}
`

export default (props) => (
  <Highlight {...props}>
    {props.children}
  </Highlight>
)
