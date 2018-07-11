const baseColors = {
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',

  white: '#fff',
  gray_100: '#f8f9fa',
  gray_200: '#e9ecef',
  gray_300: '#dee2e6',
  gray_400: '#ced4da',
  gray_500: '#adb5bd',
  gray_600: '#6c757d',
  gray_700: '#495057',
  gray_800: '#343a40',
  gray_900: '#212529',
  black: '#000',
}

const namedColors = {
  primary: baseColors.blue,
  secondary: baseColors.gray_600,
  success: baseColors.green,
  info: baseColors.cyan,
  warning: baseColors.yellow,
  danger: baseColors.red,
  light: baseColors.gray_100,
  dark: baseColors.gray_800,
}

export default {
  ...baseColors,
  ...namedColors
}
