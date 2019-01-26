import React from 'react'
import styled from 'styled-components'
import { CTX } from 'Contexts/Global'

const TextHighlight = ({ theme, children, color}) => {
  const $ = theme
  const C = styled.em`
    ${$.colorizeText(color ? color : '#fff')}
  `
  return <C>{children}</C>
}

export default ({ children, color }) => <CTX component={TextHighlight} {...{color}}>{children}</CTX>
