import React from 'react'
import styled from 'styled-components'
import { CTX } from 'Containers/GlobalContext'

const Center = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`
export default ({ children }) => <CTX component={Center}>{children}</CTX>
