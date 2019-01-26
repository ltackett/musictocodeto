import React from 'react'
import { CTX } from 'Contexts/Global'
import H from './TextHighlight'

const TextError = ({ theme, children }) => {
  const $ = theme
  return <H color={$.danger}>{children}</H>
}

export default ({ children }) => <CTX component={TextError}>{children}</CTX>
