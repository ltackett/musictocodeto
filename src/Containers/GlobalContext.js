import React from 'react'
const GlobalContext = React.createContext('GlobalContext')

export default GlobalContext

export const CTX = (props) => {
  const { component, children, ...passedProps } = props
  const Component = component

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
