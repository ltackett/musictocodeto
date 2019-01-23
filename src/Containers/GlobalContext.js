import React from 'react'
const GlobalContext = React.createContext('GlobalContext')

export default GlobalContext

export const CTX = (props) => {
  const Component = props.component
  const { children, ...passedProps } = props

  return (
    <GlobalContext.Consumer>
      {(context) => (
        <Component {...context} {...passedProps}>
          {children}
        </Component>
      )}
    </GlobalContext.Consumer>
  )
}
