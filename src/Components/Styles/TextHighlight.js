import React from 'react'
import styled from 'styled-components'
import { CTX } from 'Containers/GlobalContext'

const TextHighlight = ({ context, children, color}) => {
  const $ = context.theme
  const C = styled.em`
    ${$.colorizeText(color ? color : '#fff')}
  `
  return <C>{children}</C>
}

export default ({ children, color }) => <CTX component={TextHighlight} {...{color}}>{children}</CTX>
