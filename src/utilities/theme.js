import { css } from 'styled-components'
import { baseColors, namedColors } from 'utilities/constants'

const theme = {
  phosphorus: '#28db49',
  glow:       '0 0 10px'
}

const themeUtilities = {
  colorizeText: (color) => css`
    color: ${color ? color : '#fff'};
    text-shadow: ${color ? color : '#fff'} ${theme.glow};
  `
}

export default {
  ...baseColors,
  ...namedColors,
  ...theme,
  ...themeUtilities
}
