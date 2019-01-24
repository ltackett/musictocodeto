import React from 'react'
import { CTX } from 'Containers/GlobalContext'
import H from './TextHighlight'

const TextError = ({ context, children }) => {
  const $ = context.theme
  return <H color={$.danger}>{children}</H>
}

export default ({ children }) => <CTX component={TextError}>{children}</CTX>
