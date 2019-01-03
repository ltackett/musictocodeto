import theme from 'utilities/theme'
import styled, { keyframes } from 'styled-components'

const pulsate = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`

const Caret = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: ${theme.phosphorus};
  box-shadow: ${theme.phosphorus} ${theme.glow};
  width: 10px;
  height: 20px;

  -webkit-animation: 0.75s ${pulsate} ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
`

export default Caret
